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
