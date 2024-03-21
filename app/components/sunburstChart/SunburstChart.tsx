import Sunburst from 'sunburst-chart';
import * as d3 from 'd3';
import { useEffect } from 'react';

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
  data: SunburstNode | undefined
}

const SunburstChart = (props: SunburstElementProps) => {
  const { data } = props;
  const color = d3.scaleOrdinal(d3.schemeSet1);
  
  useEffect(() => {
    if (data) {
      Sunburst()
        .data(data)
        .color("color")(document.getElementById("chart-map")!);
    }
  }, [data]);

  return (
    <div id="chart-map" className="mb-6"></div>
  );
};

export default SunburstChart;