import React, { useState } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import "./App.css";

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  // you can also pass a React Node as a label
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
  { id: "e1-2", source: "1", target: "2", animated: false },
  { id: "e2-3", source: "2", target: "3" },
];

const App = () => {
  const [elements, setElements] = useState<any>(initialElements);
  const onElementsRemove = (elementsToRemove: any) =>
    setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) =>
    setElements((els: any) => addEdge(params, els));

  return (
    <div style={{ height: 300 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46}
      />
    </div>
  );
};

export default App;