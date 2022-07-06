export default class ModalStateManager {
    isVisible: boolean = false;
    activeModalId: number = -1;

    // Our list of unique modal ids.
    // If we ever see overlapping modals, its because of an id collision. We can make the collsion-detection more exhaustive if/when necessary.
    // (unlikely to ever see as of now)
    static playHelpId = 0;
    static playSettingsId = 1;

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

    getBlockOrNot() {
        return this.isVisible ? 'block' : 'none';
    }

    setActive(id: number): void {
        this.activeModalId = id;
    }

    isActive(id: number): boolean {
        return this.activeModalId === id;
    }
}
