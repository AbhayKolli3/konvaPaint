import React, { useEffect } from "react";
import "./App.css";
import Konva from "konva";
import KonvaShapeFactory from "./KonvaShapeFactory";
import { Vector2d } from "konva/lib/types";
import Tool from "./components/Tool";
function App() {


  return (
    <div>
      <select id="item">
        <option value="paint">Paint</option>
        <option value="eraser">Eraser</option>
      </select>
      <Tool />

      <div id="container" className="App"></div>
    </div>
  );
}

export default App;
