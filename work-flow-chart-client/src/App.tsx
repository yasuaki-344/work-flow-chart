import { Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
} from "react-flow-renderer";
import { DragPanel } from "./DragPanel";
import "./App.css";
import { FlowMiniMap } from "./FlowMiniMap";
import { Controller } from "./Controller";

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const controller: Controller = new Controller();

  const reactFlowWrapper = useRef<any | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);

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
        controller.addNode(newNode);
      }
    }
  };

  /**
   * Background component
   */
  const background = <Background color="#aaa" gap={16} />;

  const [nodeName, setNodeName] = useState("Node 1");

  useEffect(() => {
    controller.setElements((els: any) =>
      els.map((el: any) => {
        if (el.id === "1") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            label: nodeName,
          };
        }
        return el;
      })
    );
    // eslint-disable-next-line
  }, [nodeName]);

  return (
    <>
      <ReactFlowProvider>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <DragPanel />
            <div style={{ height: 400 }} ref={reactFlowWrapper}>
              <ReactFlow
                elements={controller.elements}
                onElementsRemove={controller.removeElements}
                onConnect={controller.connectNodes}
                deleteKeyCode={46}
                onLoad={onLoad}
                onDrop={onDrop}
                onDragOver={onDragOver}
              >
                <FlowMiniMap />
                <Controls />
                {background}
              </ReactFlow>
            </div>
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ mt: 2 }}
              required
              size="small"
              label="label"
              value={nodeName}
              onChange={(evt) => setNodeName(evt.target.value)}
            />
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </>
  );
};

export default App;
