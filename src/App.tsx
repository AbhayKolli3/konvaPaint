import React, { useEffect } from "react";
import "./App.css";
import Konva from "konva";
import KonvaShapeFactory from "./KonvaShapeFactory";
import { Vector2d } from "konva/lib/types";

function App() {
  useEffect(() => {
    var select = document.getElementById("item") as HTMLInputElement;

    var width = window.innerWidth;
    var height = window.innerHeight;
    var stage = new Konva.Stage({
      container: "container",
      width: width,
      height: height - 25,
    });
    var newLine = KonvaShapeFactory.Line({
      points: [0, 0, 0, 0],
      stroke: "#df4b26",
      strokeWidth: 5,
      lineCap: "round",
      lineJoin: "round",
    });
    var layer = new Konva.Layer();
    var paintMode = false;

    stage.add(layer);
    stage.on("mousedown", (e) => {
      paintMode = true;
      var mouseDown = stage.getPointerPosition() as Vector2d;
      newLine = KonvaShapeFactory.Line({
        points: [mouseDown.x, mouseDown.y, mouseDown.x, mouseDown.y],
        stroke:  "red" ,
        globalCompositeOperation: select.value === 'eraser' ? 'destination-out' : 'source-over',
        strokeWidth: 5,
        lineCap: "round",
        lineJoin: "round",
      });
      layer.add(newLine);
    });
    stage.on("mouseup", (e) => {
      console.log("mouseup");
      if (paintMode) {
        paintMode = false;
      }
    });

    stage.on("mousemove", (e) => {
      if (paintMode) {
        var tail = stage.getPointerPosition() as Vector2d;
        var lineTail = newLine.points().concat([tail.x, tail.y]);
        newLine.points(lineTail);
      }
    });
  }, []);

  return (
    <div>
      <select id="item">
        <option value="paint">Paint</option>
        <option value="eraser">Eraser</option>
      </select>

      <div id="container" className="App"></div>
    </div>
  );
}

export default App;
