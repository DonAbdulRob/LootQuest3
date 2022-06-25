export default class ModalStateManager {
    isVisible: boolean = false;

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

    getBlockOrNot() {
        return this.isVisible ? 'block' : 'none';
    }
}
