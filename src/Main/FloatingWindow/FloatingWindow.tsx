import React, { useEffect } from "react";
import './FloatingWindow.css';

export default function FloatingWindow() {
    const elementRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
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
                // var elmnt: any = mouseDownEvent.target;
                var p: any = mouseDownEvent.target;
                var elmnt: any = p.parentNode;

                var finalTop = (elmnt.offsetTop - pos2);
                var finalLeft = (elmnt.offsetLeft - pos1);
                var maxBottom = document.body.clientHeight - 200;
                var maxRight = document.body.clientWidth - 500;

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
        
        var theElement = elementRef.current;

        if (theElement !== null) {
            theElement.addEventListener("mousedown", mouseDownFunction);
        }
    });

    return <div id="floating-window">
        <div id="floating-window-title" ref={elementRef}>
            <button>Minimize</button>
            <button>Maximize</button>
            <button>Close</button>
        </div>

        <h1>This is a Floating Window</h1>
        <p>The floating window's content</p>
    </div>
}

/**
 * 

        
 */