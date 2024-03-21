import { useEffect } from 'react';
import * as d3 from 'd3';
import Sunburst from 'sunburst-chart';

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
      console.log('dattaaa');
      Sunburst()
        .data(data)
        .label('name')
        .labelOrientation('angular')
        .maxLevels(10)
        .color((d, parent) => color(parent ? parent.data.name : null))
        .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)(document.getElementById("chart-map")!);
    }
  }, []);

  return (
    <div id="chart-map" className="mb-6"></div>
  );
};

export default SunburstChart;