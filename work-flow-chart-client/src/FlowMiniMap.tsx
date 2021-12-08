import { MiniMap } from "react-flow-renderer";
import "./App.css";

export const FlowMiniMap = () => {
  return (
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
};
