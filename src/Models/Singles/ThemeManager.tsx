export default class ThemeManager {
    colors: string[] = [];
    redColors = [
        'rgb(255, 233, 233)',
        'rgb(255, 199, 199)',
        'rgb(252, 209, 209)',
        'rgb(252, 245, 245)',
        'rgb(151, 30, 0)',
        '#c7573b',
    ];

    softBlueColors = [
        'rgb(235, 254, 255)',
        'rgb(199, 243, 255)',
        'rgb(207, 244, 252)',
        'rgb(243, 249, 251)',
        'rgb(0, 64, 153)',
        'rgb(60, 144, 200)',
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

    useSoftBlue() {
        this.colors = [...this.softBlueColors];
    }

    useBlue() {
        this.colors = [...this.blueColors];
    }

    doUpdate() {
        for (let i = 0; i < this.colors.length; i++) {
            document.documentElement.style.setProperty('--main-color-' + i, this.colors[i]);
        }
    }
}
