import React from "react";
import ReactFlow from "react-flow-renderer";
import "./App.css";

const App = () => {
  const elements = [
    {
      id: "1",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 250, y: 5 },
    },
    // you can also pass a React Node as a label
    {
      id: "2",
      data: { label: <div>Node 2</div> },
      position: { x: 100, y: 100 },
    },
    { id: "e1-2", source: "1", target: "2", animated: true },
  ];

  console.log(elements);
  return (
    <ReactFlow elements={elements} style={{ width: "100%", height: "500px" }} />
  );
};

export default App;
