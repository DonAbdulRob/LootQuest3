/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './FloatingWindow.css';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import WindowStateManager, {
    FloatingWindowData,
} from '../../Models/Singles/WindowStateManager';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';

function assignDragBehavior(
    ele: any,
    levelsToParent: number,
    pos1: React.MutableRefObject<number>,
    pos2: React.MutableRefObject<number>,
    pos3: React.MutableRefObject<number>,
    pos4: React.MutableRefObject<number>,
    windowData: FloatingWindowData,
) {
    // Implement draggable logic.
    function mouseDownFunction(mouseDownEvent: any) {
        mouseDownEvent = mouseDownEvent || window.event;
        mouseDownEvent.preventDefault();

        windowData.isBeingHovered = true;

        // get the mouse cursor position at startup:
        pos3.current = mouseDownEvent.clientX;
        pos4.current = mouseDownEvent.clientY;

        function mouseUp(e: any) {
            document.removeEventListener('mouseup', mouseUp);
            document.removeEventListener('mousemove', mouseMove);

            windowData.isBeingHovered = false;

            // Update stored
            let elmnt: any = mouseDownEvent.target;

            for (let i = 0; i < levelsToParent; i++) {
                elmnt = elmnt.parentNode;
            }

            var rect = elmnt.getBoundingClientRect();
            windowData.top = rect.top;
            windowData.left = rect.left;
        }

        function mouseMove(e: any) {
            e = e || window.event;
            e.preventDefault();

            // calculate the new cursor position:
            pos1.current = pos3.current - e.clientX;
            pos2.current = pos4.current - e.clientY;
            pos3.current = e.clientX;
            pos4.current = e.clientY;

            // set the element's new position:
            // let elmnt: any = mouseDownEvent.target;
            let p: any = mouseDownEvent.target;
            let elmnt: any = p;

            for (let i = 0; i < levelsToParent; i++) {
                elmnt = elmnt.parentNode;
            }

            let finalTop = elmnt.offsetTop - pos2.current;
            let finalLeft = elmnt.offsetLeft - pos1.current;
            let maxRight = document.body.clientWidth - 300;

            if (finalTop < 0) {
                finalTop = 0;
            } else if (finalTop >= 5000) {
                finalTop = 5000;
            }

            if (finalLeft < 0) {
                finalLeft = 0;
            } else if (finalLeft >= maxRight) {
                finalLeft = maxRight;
            }

            elmnt.style.top = finalTop + 'px';
            elmnt.style.left = finalLeft + 'px';
        }

        document.addEventListener('mouseup', mouseUp);
        document.addEventListener('mousemove', mouseMove);
    }

    if (ele !== null) {
        ele.addEventListener('mousedown', mouseDownFunction);
    }
}

function assignResizeDragBehavior(
    ele: any,
    levelsToParent: number,
    pos1: React.MutableRefObject<number>,
    pos2: React.MutableRefObject<number>,
    pos3: React.MutableRefObject<number>,
    pos4: React.MutableRefObject<number>,
    windowData: FloatingWindowData,
) {
    // Implement draggable logic.
    function mouseDownFunction(mouseDownEvent: any) {
        mouseDownEvent = mouseDownEvent || window.event;
        mouseDownEvent.preventDefault();

        windowData.isBeingHovered = true;

        pos3.current = mouseDownEvent.clientX;
        pos4.current = mouseDownEvent.clientY;

        function mouseUp(e: any) {
            document.removeEventListener('mouseup', mouseUp);
            document.removeEventListener('mousemove', mouseMove);

            windowData.isBeingHovered = false;

            // Update stored
            let elmnt: any = mouseDownEvent.target;

            for (let i = 0; i < levelsToParent; i++) {
                elmnt = elmnt.parentNode;
            }

            // var rect = elmnt.getBoundingClientRect();
            // windowData.top = rect.top;
            // windowData.left = rect.left;
        }

        function mouseMove(e: any) {
            e = e || window.event;
            e.preventDefault();

            let p: any = mouseDownEvent.target;
            let elmnt: any = p;

            for (let i = 0; i < levelsToParent; i++) {
                elmnt = elmnt.parentNode;
            }

            // calculate the new cursor position:
            let top = e.clientY - elmnt.offsetTop + 25;
            let left = e.clientX - elmnt.offsetLeft + 50;
            let minHeight = 250;
            let minWidth = 300;

            if (top < minHeight) {
                top = minHeight;
            }

            if (left < minWidth) {
                left = minWidth;
            }
            elmnt.style.height = top + 'px';
            elmnt.style.width = left + 'px';
            windowData.height = top + '';
            windowData.width = left + '';
        }

        document.addEventListener('mouseup', mouseUp);
        document.addEventListener('mousemove', mouseMove);
    }

    if (ele !== null) {
        ele.addEventListener('mousedown', mouseDownFunction);
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

interface FloatingWindowProps {
    id: number;
    contentElement: JSX.Element;
}

export default function FloatingWindow(
    props: FloatingWindowProps,
): JSX.Element {
    // Var init.
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE(
        (__DATA: any) => __DATA.windowStateManager,
    );

    const titleBarDragRef = React.useRef<HTMLDivElement>(null);
    const titleDragRef = React.useRef<HTMLDivElement>(null);
    const windowContentRef = React.useRef<HTMLDivElement>(null);
    const parentEleRef = React.useRef<HTMLDivElement>(null);
    const resizeDragRef = React.useRef<HTMLButtonElement>(null);

    // Always keep ref var in memory.
    const pos1 = React.useRef(0);
    const pos2 = React.useRef(0);
    const pos3 = React.useRef(0);
    const pos4 = React.useRef(0);

    const pos5 = React.useRef(0);
    const pos6 = React.useRef(0);
    const pos7 = React.useRef(0);
    const pos8 = React.useRef(0);

    const windowData: FloatingWindowData =
        windowStateManager.windowDataArr[props.id];

    // After render, assign drag behavior.
    useEffect(() => {
        windowData.ref = parentEleRef;

        assignDragBehavior(
            titleDragRef.current,
            3,
            pos1,
            pos2,
            pos3,
            pos4,
            windowData,
        );

        assignResizeDragBehavior(
            resizeDragRef.current,
            2,
            pos5,
            pos6,
            pos7,
            pos8,
            windowData,
        );
    });

    return (
        <div
            className="floating-window"
            ref={parentEleRef}
            style={{
                zIndex: windowData.zIndex,
                top: windowData.top,
                left: windowData.left,
                width: windowData.width + 'px',
                height: windowData.height + 'px',
                opacity: windowStateManager.opacity,
            }}
            onMouseEnter={(e: any) => {
                if (
                    parentEleRef === null ||
                    parentEleRef.current === null ||
                    windowStateManager.hasActiveHover()
                ) {
                    return true;
                }

                windowStateManager.setOnTop(props.id);
            }}
        >
            <div
                className="floating-window-titlebar flex-container"
                ref={titleBarDragRef}
            >
                <div className="flex-item-left">
                    <button
                        onClick={(e) => {
                            minimizeClick(e, windowContentRef);
                        }}
                    >
                        Minimize
                    </button>
                    <button
                        onClick={(e) => {
                            console.log('A');
                            maximizeClick(e, windowContentRef);
                        }}
                    >
                        Maximize
                    </button>
                    <button onClick={closeClick}>Close</button>
                </div>

                <div className="text-style flex-item-right" ref={titleDragRef}>
                    <button>Drag Me!</button>
                </div>

                <div className="titleText">{windowData.title}</div>
            </div>

            <div
                ref={windowContentRef}
                style={{ overflow: 'visible !important' }}
            >
                {props.contentElement}
            </div>
            <div className="align-right">
                <button ref={resizeDragRef}>Resize</button>
            </div>
        </div>
    );
}
