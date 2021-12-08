import React, { useState } from "react";
import {
  Connection,
  Edge,
  Elements,
  removeElements,
} from "react-flow-renderer";
import { initialElements } from "./InitialElement";

export class Controller {
  readonly elements: Elements;

  readonly setElements: React.Dispatch<React.SetStateAction<Elements>>;

  constructor() {
    // eslint-disable-next-line
    const [elements, setElements] = useState<Elements>(initialElements);
    this.elements = elements;
    this.setElements = setElements;
  }

  /**
   * Called when user removes node or edge
   * @param elementsToRemove
   * @returns
   */
  removeElements = (elementsToRemove: Elements): void => {
    this.setElements((els: Elements) => removeElements(elementsToRemove, els));
  };

  addNode(newNode: any) {
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
      })
    });
  };
}
