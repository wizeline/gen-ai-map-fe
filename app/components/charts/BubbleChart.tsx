/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NodeType } from '~/types';

interface BubbleChartProps {
  data: NodeType;
  onSelectNode?: (args: any) => void;
}

const BubbleChart: FC<BubbleChartProps> = ({ data, onSelectNode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isSVGRendered, setIsSVGRendered] = useState(false);

  useEffect(() => {
    if (!svgRef.current || isSVGRendered) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = 900;
    const height = 900;

    const color = d3.scaleLinear<string>()
      .domain([0, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

    const pack = (data: any) => d3.pack()
      .size([width, height])
      .padding(3)
      (d3.hierarchy(data)
        .sum((d: any) => d.value)
        .sort((a: any, b: any) => b.value - a.value));
    const root = pack(data);

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("style", `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: transparent; cursor: pointer;`);

    const node = svg.append("g")
      .selectAll<SVGCircleElement, unknown>("circle")
      .data(root.descendants().slice(1))
      .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) =>{
            focus !== d && (zoom(event, d), event.stopPropagation());
            onSelectNode && onSelectNode(["s", "dfsd"]);
        });

    const label = svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll<SVGTextElement, unknown>("text")
      .data(root.descendants())
      .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text((d: any) => d.data.name);

    svg.on("click", (event) => zoom(event, root));
    let focus = root;
    let view: [number, number, number];
    zoomTo([focus.x, focus.y, focus.r * 2]);

    function zoomTo(v: [number, number, number]) {
      const k = width / v[2];

      view = v;

      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }

    function zoom(event: d3.D3ZoomEvent<SVGSVGElement, unknown>, d: any) {
      const focus0 = focus;

      focus = d;

      const transition = svg.transition()
          .duration((event as any).altKey ? 7500 : 750)
          .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });

      label
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition as any)
          .style("fill-opacity", d => d.parent === focus ? 1 : 0)
          .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }
    setIsSVGRendered(true);
  }, [data, isSVGRendered, onSelectNode]);

  return <svg ref={svgRef}></svg>;
}

export default BubbleChart;
