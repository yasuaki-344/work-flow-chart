export const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Node3" },
    position: { x: 100, y: 200 },
  },
  {
    id: "4",
    type: "output",
    data: { label: "Node4" },
    position: { x: 300, y: 200 },
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "step",
    label: "edge label",
    animated: false,
  },
  { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
];
