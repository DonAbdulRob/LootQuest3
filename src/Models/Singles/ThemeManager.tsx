export default class ThemeManager {
    colors: string[] = [];
    redColors = [
        'rgb(255, 233, 233)',
        'rgb(255, 199, 199)',
        'rgb(252, 209, 209)',
        'rgb(252, 245, 245)',
        '#971e00',
        '#c7573b',
    ];
    blueColors = ['#F8F7FF', '#7ebfff', '#78aaff', '#cce1f5', '#173e6c', '#5da2e5'];
    customizeTheme: boolean = false;

    constructor() {
        this.useBlue();
    }

    toggleCustomizeTheme() {
        this.customizeTheme = !this.customizeTheme;
    }

    useRed() {
        this.colors = [...this.redColors];
    }
    useBlue() {
        this.colors = [...this.blueColors];
    }
}
