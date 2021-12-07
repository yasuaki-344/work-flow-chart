import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Elements,
  Edge,
  Connection,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
} from "react-flow-renderer";
import { DragPanel } from "./DragPanel";
import "./App.css";

const initialElements = [
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

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef<any | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);
  const [elements, setElements] = useState<any>(initialElements);
  /**
   * Called when user removes node or edge
   * @param elementsToRemove
   * @returns
   */
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els: Elements) => removeElements(elementsToRemove, els));

  /**
   * Called when user connects two nodes
   * @param params
   * @returns
   */
  const onConnect = (params: Edge<any> | Connection) =>
    setElements((els: Elements) => addEdge(params, els));

  /**
   * minimap setting
   */
  const minimap = (
    <MiniMap
      nodeStrokeColor={(n) => {
        if (n.style?.background) return n.style.background.toString();
        if (n.type === "input") return "#0041d0";
        if (n.type === "output") return "#ff0072";
        if (n.type === "default") return "#1a192b";
        return "#eee";
      }}
      nodeColor={(n) => {
        if (n.style?.background) return n.style.background.toString();

        return "#fff";
      }}
      nodeBorderRadius={2}
    />
  );

  const onLoad = (_reactFlowInstance: any) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: any) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (reactFlowWrapper.current != null) {
      console.log(reactFlowWrapper.current);
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (reactFlowInstance != null) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };
        setElements((es: any) => es.concat(newNode));
      }
    }
  };

  /**
   * Background component
   */
  const background = <Background color="#aaa" gap={16} />;

  return (
    <>
      <ReactFlowProvider>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <DragPanel />
            <div style={{ height: 400 }} ref={reactFlowWrapper}>
              <ReactFlow
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                deleteKeyCode={46}
                onLoad={onLoad}
                onDrop={onDrop}
                onDragOver={onDragOver}
              >
                {minimap}
                <Controls />
                {background}
              </ReactFlow>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <div>
                <label>label:</label>
                <input
                // value={nodeName}
                // onChange={(evt) => setNodeName(evt.target.value)}
                />
              </div>
              <div>
                <label>background:</label>
                <input
                //  value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </>
  );
};

export default App;
