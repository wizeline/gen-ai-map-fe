/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useScreenSize } from "~/context/ScreenSizeContext";
import { hierarchy } from "d3";

export type SunburstLeaf = {
  name: string;
  size: number;
  color: string;
};

export type SunburstNode = {
  name: string;
  color: string;
  size: number;
  children: (SunburstNode | SunburstLeaf)[];
};

interface SunburstElementProps {
  data: SunburstNode | undefined;
  onSelectNodePath?: (args: any) => void;
  onSelectNode?: (args: any) => void;
}

const SunburstChart = (props: SunburstElementProps) => {
  const { data, onSelectNodePath, onSelectNode } = props;
  const color = d3.scaleOrdinal(d3.schemeSet1);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [Sunburst, setSunburst] = useState<any | null>(null);
  const [hasChildNodes, setHasChildNodes] = useState(false);
  const { isDesktop, isTablet } = useScreenSize();
  const chartWidth = isDesktop ? 800 : isTablet ? 600 : 300;

  useEffect(() => {
    if (chartRef.current) {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            setHasChildNodes(chartRef.current?.hasChildNodes() ?? false);
          }
        }
      });

      observer.observe(chartRef.current, { childList: true });

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("sunburst-chart").then((module) => {
        setSunburst(module.default);
      });
    }
  }, []);

  useEffect(() => {
    if (data && Sunburst && !hasChildNodes) {
      const chart = Sunburst();

      chart
        .data(data)
        .label("name")
        .labelOrientation("angular")
        .maxLevels(10)
        .color((d: any, parent: any) => color(parent ? parent.data.name : null))
        .onHover((node: any) => {
          if (node) {
            let lastPath = "";

            hierarchy(data, (d: any) => d.children)
              .sum((d) => d.size)
              .sort((a, b) => (b.value ? b.value : 0) - (a.value ? a.value : 0))
              .each((nodeI) => {
                if (node.name === nodeI.data.name) {
                  lastPath = nodeI
                    .ancestors()
                    .map((d) => d.data.name)
                    .reverse()
                    .join("/");
                }
              });

            onSelectNodePath && onSelectNodePath(lastPath.split("/"));

            if (!node.children) {
              onSelectNode && onSelectNode(node?.name);
            } else {
              onSelectNode && onSelectNode("");
            }
          }
        })
        .width(chartWidth)
        .tooltipTitle(() => "")
        .tooltipContent((d: any, node: any) => `Size: <i>${node.value}</i>`)(
        chartRef.current
      );
    }
  }, [
    data,
    Sunburst,
    color,
    hasChildNodes,
    chartWidth,
    onSelectNode,
    onSelectNodePath,
  ]);

  return <div ref={chartRef} className="max-w-[800px] z-0"></div>;
};

export default SunburstChart;
