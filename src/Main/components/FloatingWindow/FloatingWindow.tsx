/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FloatingWindowProps } from "./FloatingWindowProps";
import './FloatingWindow.css';

let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

function assignDragBehavior(ele: any, levelsToParent: number) {
    // Implement draggable logic.
    function mouseDownFunction(mouseDownEvent: any) {
        mouseDownEvent = mouseDownEvent || window.event;
        mouseDownEvent.preventDefault();
        
        // get the mouse cursor position at startup:
        pos3 = mouseDownEvent.clientX;
        pos4 = mouseDownEvent.clientY;

        function mouseUp(e: any) {
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        }

        function mouseMove(e: any) {
            e = e || window.event;
            e.preventDefault();
            
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // set the element's new position:
            // let elmnt: any = mouseDownEvent.target;
            let p: any = mouseDownEvent.target;
            let elmnt: any = p;
            
            for (let i = 0; i < levelsToParent; i++) {
                elmnt = elmnt.parentNode;
            }

            let finalTop = (elmnt.offsetTop - pos2);
            let finalLeft = (elmnt.offsetLeft - pos1);
            let maxBottom = document.body.clientHeight - 200;
            let maxRight = document.body.clientWidth - 500;

            if (maxBottom < 500) {
                maxBottom = 500;
            }

            if (finalTop < 0) {
                finalTop = 0;
            } else if (finalTop >= maxBottom) {
                finalTop = maxBottom;
            }

            if (finalLeft < 0) {
                finalLeft = 0;
            } else if (finalLeft >= maxRight) {
                finalLeft = maxRight;
            }

            elmnt.style.top = finalTop + "px";
            elmnt.style.left = finalLeft + "px";
        }

        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("mousemove", mouseMove);
    }
    
    if (ele !== null) {
        ele.addEventListener("mousedown", mouseDownFunction);
    }
}

function closeClick(e: any) {
    e.target.parentNode.parentNode.parentNode.hidden = true;
}

function minimizeClick(e: any, windowContentRef: any) {
    windowContentRef.current.hidden = true;
}

function maximizeClick(e: any, windowContentRef: any) {
    windowContentRef.current.hidden = false;
}

export default function FloatingWindow(props: FloatingWindowProps): JSX.Element {
    const titleBarRef = React.useRef<HTMLDivElement>(null);
    const titleRef = React.useRef<HTMLDivElement>(null);
    const windowContentRef = React.useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        assignDragBehavior(titleBarRef.current, 1);
        assignDragBehavior(titleRef.current, 3);
    });

    var style = {
        top: props.top + "px",
        left: props.left + "px"
    }

    return <div className="floating-window" style={style}>
        <div className="floating-window-titlebar flex-container" ref={titleBarRef}>
            <div className="flex-item-left">
                <button onClick={(e) => {minimizeClick(e, windowContentRef)}}>Minimize</button>
                <button onClick={(e) => {maximizeClick(e, windowContentRef)}}>Maximize</button>
                <button onClick={closeClick}>Close</button>
            </div>
            
            <div className="text-style flex-item-right">
                <div className="titleText" ref={titleRef}>{props.title}</div>
            </div>
        </div>

        <div ref={windowContentRef}>
            {props.contentElement}
        </div>
    </div>
}
