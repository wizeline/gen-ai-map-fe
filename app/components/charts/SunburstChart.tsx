/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useScreenSize } from "~/context/ScreenSizeContext";
import ModalInformation from "../information/ModalInformation";
import { NodeType } from "~/types";

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
}

const SunburstChart = (props: SunburstElementProps) => {
  const { data } = props;
  const color = d3.scaleOrdinal(d3.schemeSet1);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [Sunburst, setSunburst] = useState<any | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [hasChildNodes, setHasChildNodes] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { isDesktop, isTablet } = useScreenSize();
  const chartWidth = isDesktop ? 800 : isTablet ? 600 : 300;

  const handleIsInfoModalOpen = () => {
    setIsInfoModalOpen(true);
  };

  const handleIsInfoModalClose = () => {
    setSelectedNode(null);
    setIsInfoModalOpen(false);
  };

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
            setSelectedNode(node);
          }
          if (!isInfoModalOpen) {
            handleIsInfoModalOpen();
          }
        })
        .width(chartWidth)
        .tooltipContent((d: any, node: any) => `Size: <i>${node.value}</i>`)(
        chartRef.current
      );
    }
  }, [data, Sunburst, color, hasChildNodes, chartWidth, isInfoModalOpen]);

  return (
    <>
      <div ref={chartRef} className="max-w-[800px] z-0"></div>
      {isInfoModalOpen && selectedNode && (
        <ModalInformation
          onClose={handleIsInfoModalClose}
          node={selectedNode}
        />
      )}
    </>
  );
};

export default SunburstChart;
