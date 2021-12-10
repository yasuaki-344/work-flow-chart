import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Connection,
  Edge,
  Elements,
  Node,
  removeElements,
} from "react-flow-renderer";
import { initialElements } from "./InitialElement";

let id = 0;
const getId = () => `dndnode_${id++}`;

export class Controller {
  readonly elements: Elements;

  readonly targetId: string;

  readonly targetEdges: any;

  private readonly setElements: Dispatch<SetStateAction<any>>;

  private readonly setTargetId: Dispatch<SetStateAction<string>>;

  private readonly setTargetEdges: Dispatch<SetStateAction<any>>;

  constructor() {
    // eslint-disable-next-line
    const [elements, setElements] = useState<any>(initialElements);
    this.elements = elements;
    this.setElements = setElements;

    // eslint-disable-next-line
    const [targetId, setTargetId] = useState("");
    this.targetId = targetId;
    this.setTargetId = setTargetId;

    // eslint-disable-next-line
    const [data, setData] = useState({});
    this.targetEdges = data;
    this.setTargetEdges = setData;
  }

  updateNodeLabel(label: string): void {
    this.setElements((els: any) =>
      els.map((el: any) => {
        if (el.id === this.targetId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            label,
          };
        }
        return el;
      })
    );
  }

  /**
   * Called when user removes node or edge
   * @param elementsToRemove
   * @returns
   */
  removeElements = (elementsToRemove: Elements): void => {
    this.setElements((els: Elements) => removeElements(elementsToRemove, els));
  };

  addNode(type: string, position: any): void {
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };
    this.setElements((es: Elements) => es.concat(newNode));
  }

  /**
   * Called when user connects two nodes
   * @param params
   * @returns
   */
  connectNodes = (params: Edge<any> | Connection): void => {
    const { source, target } = params;
    this.setElements((els: Elements) => {
      return els.concat({
        id: `edge-${source}-${target}`,
        source: `${source}`,
        target: `${target}`,
        type: "step",
        label: `action-${source}-${target}`,
        animated: false,
      });
    });
  };

  setEditTarget = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node<any>
  ): void => {
    this.setTargetId(node.id);
    this.setTargetEdges(
      this.elements
        .filter((x: any) => x.source !== undefined)
        .filter((x: any) => x.source === node.id)
        .map((x: any) => {
          return { id: x.id, label: x.label };
        })
    );
  };
}
