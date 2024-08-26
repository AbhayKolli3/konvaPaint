import Konva from "konva";
import React, { useEffect } from "react";
import { Vector2d } from "konva/lib/types";
import KonvaShapeFactory from "../KonvaShapeFactory";



function Stage (){
    let paintMode = false;
    let mode ="source-over"  as GlobalCompositeOperation

    function changeMode(e : React.ChangeEvent<HTMLSelectElement>){
        if (e.currentTarget.value==="eraser"){
            mode="destination-out"

        }
        else{
            mode="source-over"
        }
        


    }
    function addMouseUpEvent(stage: Konva.Stage){
        stage.on("mouseup", (e) => {
            console.log("mouseup");
            if (paintMode) {
              paintMode = false;
            }
          });

    }
    function addMouseDownEvent(stage : Konva.Stage){
        stage.on("mousedown", (e) => {
            paintMode = true;
            var mouseDown = stage.getPointerPosition() as Vector2d;
            newLine = KonvaShapeFactory.Line({
              points: [mouseDown.x, mouseDown.y, mouseDown.x, mouseDown.y],
              stroke:  "red" ,
              globalCompositeOperation: mode,
              strokeWidth: 5,
              lineCap: "round",
              lineJoin: "round",
            });
            layer.add(newLine);
          });
          


    }
    function addMouseMoveEvent(stage : Konva.Stage){
        stage.on("mousemove", (e) => {
            if (paintMode) {
              var tail = stage.getPointerPosition() as Vector2d;
              var lineTail = newLine.points().concat([tail.x, tail.y]);
              newLine.points(lineTail);
            }
          });


    }

    function addEventListeners(stage : Konva.Stage){
        addMouseUpEvent(stage)
        addMouseMoveEvent(stage)
        addMouseDownEvent(stage)

        

    }
    let width = window.innerWidth;
    let height = window.innerHeight;
    const layer = new Konva.Layer();
    let isPaint = false;
    var newLine = KonvaShapeFactory.Line({
        points: [0, 0, 0, 0],
        stroke: "#df4b26",
        strokeWidth: 5,
        lineCap: "round",
        lineJoin: "round",
      });
    useEffect(()=>{

        const stage = new Konva.Stage({
            container:"container",
            width: width,
            height: height - 25,
          })
          stage.add(layer);
          addEventListeners(stage)
        

    })

    return(
        <div className="macPaint">
                  <select id="item" onChange={(e)=>changeMode(e)}>
        <option value="paint">Paint</option>
        <option value="eraser">Eraser</option>
      </select>
            <div id="container" className="App"></div>

            </div>

        )
}

export default Stage