import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Vector2d } from "konva/lib/types";
import KonvaShapeFactory from "../KonvaShapeFactory";


function Stage (){
    const mode = useRef<GlobalCompositeOperation>("source-over")
    let newLine = useRef(KonvaShapeFactory.Line({//
      points: [0, 0, 0, 0],
      stroke: "#df4b26",
      strokeWidth: 5,
      lineCap: "round",
      lineJoin: "round",
    }))
    function addMouseUpEvent(stage: Konva.Stage){
      stage.off('mouseup')
        stage.on("mouseup", (e) => {
             if (paintMode) {
              paintMode = false;
            }
          });

    }
    function addMouseDownEvent(stage : Konva.Stage,layer:Konva.Layer){
      stage.off('mousedown')
        stage.on("mousedown", (e) => {
      

            paintMode = true;
            var mouseDown = stage.getPointerPosition() as Vector2d;
            newLine.current = KonvaShapeFactory.Line({
              points: [mouseDown.x, mouseDown.y, mouseDown.x, mouseDown.y],
              stroke:  "red" ,
              globalCompositeOperation: mode.current,
              strokeWidth: 5,
              lineCap: "round",
              lineJoin: "round",
            });
            layer.add(newLine.current);
          });
          


    }
    function addMouseMoveEvent(stage : Konva.Stage){
     
        stage.on("mousemove", (e) => {
            if (paintMode) {
              var tail = stage.getPointerPosition() as Vector2d;
              var lineTail = newLine.current.points().concat([tail.x, tail.y]);
              newLine.current.points(lineTail);
            }
          });


    }

    function addEventListeners(stage : Konva.Stage,layer : Konva.Layer){
        addMouseUpEvent(stage)
        addMouseMoveEvent(stage)
        addMouseDownEvent(stage,layer)

        

    }
    let paintMode = false

    function changeMode(e : React.ChangeEvent<HTMLSelectElement>){
        if (e.currentTarget.value==="eraser"){
            console.log("setting eraser")
            mode.current="destination-out"
        }
        else{
            console.log("setting brush")
            mode.current="source-over"
        }



    }


    useEffect(()=>{
    const layer = new Konva.Layer();
        
          const stage = new Konva.Stage({
            container:"container",
            width: window.innerWidth,
            height: window.innerHeight - 25,
          })
          stage.add(layer);
          addEventListeners(stage,layer)
        

    },[])

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