import React, { useState } from "react";
import { Elements, removeElements } from "react-flow-renderer";
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
}
