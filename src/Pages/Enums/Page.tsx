export class Page {
    component: JSX.Element;
    showAnimation: boolean;

    constructor(component: JSX.Element, showAnimation: boolean) {
        this.component = component;
        this.showAnimation = showAnimation;
    }
}
