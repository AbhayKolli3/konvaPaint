import React, { useEffect } from "react";
import "./App.css";
import Konva from "konva";
import KonvaShapeFactory from "./KonvaShapeFactory";
import { Vector2d } from "konva/lib/types";
import Tool from "./components/Brush";
function App() {


  return (
    <div>
      <Tool />
      <select id="item">
        <option value="paint">Paint</option>
        <option value="eraser">Eraser</option>
      </select>

      <div id="container" className="App"></div>
    </div>
  );
}

export default App;
