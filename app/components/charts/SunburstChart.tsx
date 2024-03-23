/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

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
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleIsInfoModalOpen = () => {
    setIsInfoModalOpen(true);
  };

  const handleIsInfoModalClose = () => {
    setIsInfoModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("sunburst-chart").then((module) => {
        setSunburst(module.default);
      });
    }
  }, []);

  useEffect(() => {
    if (data && Sunburst) { 
      const chart = Sunburst();
      chart
        .data(data)
        .label("name")
        .labelOrientation("angular")
        .maxLevels(10)
        .color((d: any, parent: any) => color(parent ? parent.data.name : null))
        .focusOnNode((node: any) => {
            console.log(node);
        })
        .tooltipContent((d: any, node: any) => `Size: <i>${node.value}</i>`)(
        chartRef.current
      );
    }
  }, [data, Sunburst, color]);

  return (
    <div ref={chartRef}></div>
  );
};

export default SunburstChart;
