import React, { useState } from "react";
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

  readonly setElements: React.Dispatch<React.SetStateAction<Elements>>;

  readonly data: any;

  readonly setData: React.Dispatch<React.SetStateAction<any>>;

  constructor() {
    // eslint-disable-next-line
    const [elements, setElements] = useState<Elements>(initialElements);
    this.elements = elements;
    this.setElements = setElements;

    // eslint-disable-next-line
    const [data, setData] = useState({});
    this.data = data;
    this.setData = setData;
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
    this.setData(node);
  };
}
