export default class AreaDescriptions {
    root: string;

    constructor(root: string) {
        this.root = root;
    }

    getWithCustomRoot(customRoot: string) {
        this.root = customRoot;
        return this;
    }
}
