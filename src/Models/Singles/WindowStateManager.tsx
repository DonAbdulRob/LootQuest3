import { IFloatingWindowPropsBuilder } from '../../Pages/PlayPage';

export class FloatingWindowData {
    id: number;
    title: string = '';
    top: number = 0;
    left: number = 0;
    width: string = '100%';
    height: string = '100%';
    zIndex: number = 3;
    isBeingHovered: boolean = false;
    ref: any;

    constructor(id: number) {
        this.id = id;
    }
}

export default class WindowStateManager {
    windowDataArr: Array<FloatingWindowData> = [];
    maxZIndex = 5;
    opacity: number = 1;
    embedCore: boolean = false;

    resetWindows() {
        this.windowDataArr = [];
    }

    isFree(id: number) {
        return this.windowDataArr.length <= id;
    }

    subscribe(id: number, win: IFloatingWindowPropsBuilder) {
        // Add.
        let fwd = new FloatingWindowData(id);
        fwd.title = win.title;

        if (win.top !== undefined) {
            fwd.top = win.top;
        }

        if (win.left !== undefined) {
            fwd.left = win.left;
        }

        this.windowDataArr[id] = fwd;
    }

    unsubscribe(id: number) {
        this.windowDataArr = this.windowDataArr.filter((v) => {
            if (v.id === id) {
                return false;
            }

            return true;
        });
    }

    // Limit check for z index... (cause somebody will hit this limit one day, sure)
    checkResetZIndexresetZIndex() {
        if (this.maxZIndex === 2147483640) {
            this.maxZIndex = 0;
        }
    }

    setOnTop(id: number) {
        for (var data of this.windowDataArr) {
            if (data.id === id) {
                if (data.ref !== undefined && data.ref.current !== undefined) {
                    // We manually update the ref's style so as to not trigger a refresh.
                    // Apparently, react 'reaaally' hates calling re-renders within the 'mouseenter' event, cause that breaks things.
                    // (specifically, every element died within the floating window div died, likely due to being replaced)
                    data.ref.current.style.zIndex = this.maxZIndex + 1 + '';
                    this.maxZIndex++;
                    this.checkResetZIndexresetZIndex();
                }
                // Return, regardless of whether ref is defined or not.
                return;
            }
        }
    }

    setActiveHoverState(id: number, newHoverState: boolean) {
        for (var data of this.windowDataArr) {
            if (data.id === id) {
                data.isBeingHovered = newHoverState;
            } else {
                data.isBeingHovered = !newHoverState;
            }
        }
    }

    hasActiveHover(): boolean {
        for (var data of this.windowDataArr) {
            if (data.isBeingHovered) {
                return true;
            }
        }

        return false;
    }
}
