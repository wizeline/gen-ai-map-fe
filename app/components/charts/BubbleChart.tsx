/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { NodeType } from "~/types";
import { useScreenSize } from "~/context/ScreenSizeContext";

interface BubbleChartProps {
  data: NodeType;
  onSelectNodePath?: (args: any) => void;
  onSelectNode?: (args: any) => void;
  onZoom?: (args: any) => void;
}

const colors = [
  "#E93D44",
  "#3B72A4",
  "#203449",
  "#751F22",
  "#E5C8A6",
  "#4D5D6D",
];

const BubbleChart: FC<BubbleChartProps> = ({
  data,
  onSelectNodePath,
  onSelectNode,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isSVGRendered, setIsSVGRendered] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const { isDesktop, isTablet } = useScreenSize();
  const size = isDesktop ? 900 : isTablet ? 600 : 300;
  const domainMinValue = 0;
  const domainMaxValue = 5;
  const minFontSize = 1;
  const maxFontSize = 22;

  useEffect(() => {
    if (!svgRef.current || isSVGRendered) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = size;
    const height = size;

    const color = d3
      .scaleLinear<string>()
      .domain([domainMinValue, domainMaxValue])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

    const pack = (data: any) =>
      d3.pack().size([width, height]).padding(3)(
        d3
          .hierarchy(data)
          .sum((d: any) => d.value)
          .sort((a: any, b: any) => b.value - a.value)
      );
    const root = pack(data);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr(
        "style",
        `position: absolute; top: -40; max-width: 100%; height: auto; display: block; margin: 0 -14px; background: transparent; cursor: pointer;`
      );

    const node = svg
      .append("g")
      .selectAll<SVGCircleElement, unknown>("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", (d, index) => {
        if (d.depth === 1) {
          return colors[index % colors.length];
        }
        return d.children ? color(d.depth) : "#00A7E5";
      })
      .style("visibility", (d) => (d.depth > 1 ? "hidden" : "visible"))
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#000");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
      })
      .on("click", (event, d) => {
        if (d.children) {
          setSelectedNode(null);
          focus !== d && (zoom(event, d), event.stopPropagation());
          d3.selectAll("circle")
            .filter((dd: any) => dd?.parent === d)
            .style("visibility", "visible");
        } else {
          setSelectedNode(d as any);
          onSelectNode && onSelectNode((d?.data as any)?.name ?? "");
          event.stopPropagation();
        }

        const nodePath = [];
        let currentNode: any = d;
        while (currentNode) {
          nodePath.unshift(currentNode.data.name);
          currentNode = currentNode.parent;
        }

        onSelectNodePath && onSelectNodePath(nodePath);
      });

    const label = svg
      .append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll<SVGTextElement, unknown>("text")
      .data(root.descendants())
      .join("text")
      .style("fill", "#ffffff")
      .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => (d.parent === root ? "inline" : "none"))
      .each(function (d: any) {
        const name = d.data.name;
        const value = d.value;
        const nameParts = name.split(" ");

        const fontSizeScale = d3
          .scaleLinear()
          .domain([0, width / 4])
          .range([minFontSize, maxFontSize]);
        const fontSizeScaleTools = d3
          .scaleLinear()
          .domain([0, width / 2])
          .range([minFontSize, maxFontSize]);

        const fontSize = d.depth === 1 ? fontSizeScale(d.r) : 22;
        const fontSizeTools = d.depth === 1 ? fontSizeScaleTools(d.r) : 12;

        d3.select(this)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "-0.3em")
          .text(nameParts[0])
          .style("font-family", "Montserrat")
          .style("font-weight", "700")
          .style("font-size", `${fontSize}px`)
          .style("line-height", "34px");

        // Add second line
        if (nameParts.length > 1) {
          d3.select(this)
            .append("tspan")
            .attr("x", 0)
            .attr("y", "1em")
            .text(nameParts.slice(1).join(" "))
            .style("font-family", "Montserrat")
            .style("font-weight", "700")
            .style("font-size", `${fontSize}px`)
            .style("line-height", "34px");
        }

        if (d.children) {
          d3.select(this)
            .append("tspan")
            .attr("x", 0)
            .attr("y", "4.3em")
            .text(value + " Tools")
            .style("font-family", "Nunito")
            .style("font-weight", "700")
            .style("font-size", `${fontSizeTools}px`)
            .style("line-height", "18px")
            .style("text-anchor", "middle");
        }
      });

    svg.on("click", (event) => {
      zoom(event, root);
    });
    let focus = root;
    let view: [number, number, number];
    zoomTo([focus.x, focus.y, focus.r * 2]);

    function zoomTo(v: [number, number, number]) {
      const k = width / v[2];

      view = v;

      label.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr("r", (d) => d.r * k);
    }

    function zoom(event: d3.D3ZoomEvent<SVGSVGElement, unknown>, d: any) {
      if (selectedNode !== null || !d.children) return;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const focus0 = focus;

      focus = d;

      const transition = svg
        .transition()
        .duration((event as any).altKey ? 7500 : 750)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .tween("zoom", (d) => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return (t) => zoomTo(i(t));
        });

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(transition as any)
        .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });
    }
    setIsSVGRendered(true);
  }, [data, isSVGRendered, onSelectNode, onSelectNodePath, selectedNode, size]);

  return <svg ref={svgRef}></svg>;
};

export default BubbleChart;
