import { Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  Node,
} from "react-flow-renderer";
import { DragPanel } from "./DragPanel";
import "./App.css";
import { FlowMiniMap } from "./FlowMiniMap";
import { Controller } from "./Controller";

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
        controller.addNode(type, position);
      }
    }
  };

  /**
   * Background component
   */
  const background = <Background color="#aaa" gap={16} />;

  const [nodeName, setNodeName] = useState("Node 1");

  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    controller.updateNodeLabel(nodeName);
  }, [nodeName]);

  useEffect(() => {
    controller.updateEdges(edges);
  }, [edges])

  const handleNodeDoubleClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node<any>
  ) => {
    controller.setEditTarget(event, node);
    setNodeName(node.data.label);
    if (node.id !== null) {
      setEdges(controller.getConnections(node.id));
    }
  };

  return (
    <>
      <ReactFlowProvider>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <DragPanel />
            <div style={{ height: 400 }} ref={reactFlowWrapper}>
              <ReactFlow
                elements={controller.elements}
                onElementClick={(_, element) => {
                  console.log(element);
                }}
                onElementsRemove={controller.removeElements}
                onNodeDoubleClick={handleNodeDoubleClick}
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
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  sx={{ mt: 2 }}
                  required
                  size="small"
                  label="label"
                  value={nodeName}
                  onChange={(evt) => setNodeName(evt.target.value)}
                />
              </Grid>
              {edges.map((x: any, index: number) => (
                <Grid item xs={12}>
                  <TextField
                    key={x.id}
                    required
                    size="small"
                    label={`connection ${index + 1}`}
                    value={x.label}
                    onChange={(e) => {
                      setEdges(
                        edges.map((y) => {
                          if (y.id === x.id) {
                            return { ...y, label: e.target.value };
                          }
                          return y;
                        })
                      );
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </>
  );
};

export default App;
