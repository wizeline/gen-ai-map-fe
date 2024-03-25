export type NodeType = {
  name: string;
  value: number;
  data: NodeType;
  __dataNode: DataNodeType;
  children?: NodeType[] | null;
};

export type DataNodeType = {
  __dataNode: DataNodeType;
  data: NodeType;
  depth: number;
  height: number;
  id: number;
  parent: NodeType | null;
  children: NodeType[] | null;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};
