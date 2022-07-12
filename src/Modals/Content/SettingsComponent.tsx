/**
 * The Settings page provides the user with interfaces to modify certain game settings.
 * Is designed for modal-usage only as of right now.
 */
import React from 'react';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../App';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { G_getFixedLengthNumber } from '../../Models/Helper';
import { SaveLib } from '../../Models/SaveLib';
import WindowStateManager from '../../Models/Singles/WindowStateManager';
import LoadGameComponent from '../../Pages/Components/LoadGame/LoadGameComponent';
import QuitButtonComponent from '../../Pages/Components/QuitButtonComponent';
import { HexColorPicker } from 'react-colorful';
import ThemeManager from '../../Models/Singles/ThemeManager';
import { __G_REFRESH_PLAY_PAGE as __GLOBAL_REFRESH_PLAY_PAGE } from '../../Pages/PlayPage';
import './Settings.css';
import './Modal.css';
import { StateContext } from '../../Models/GlobalContextStore';

/**
 * Need to add ability to modify game's 5 main colors AND button to reset colors.
 */
function getColorPicker(themeManager: ThemeManager, index: number, colorArr: string[], setColor: Function) {
    let ele = (
        <div className="color-picker" key={index}>
            <h1 className="pad-down-10">Color: {index}</h1>
            <HexColorPicker
                color={colorArr[index]}
                onChange={(newColor: string) => {
                    updateColor(themeManager, index, newColor, setColor);
                }}
            />
        </div>
    );

    return ele;
}

function updateColor(themeManager: ThemeManager, index: number, newColor: string, setColor: Function) {
    let x = [...themeManager.colors];
    x[index] = newColor;
    setColor(x);
    themeManager.colors = x;
}

export function SettingsComponent() {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA: any) => __DATA);
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    let saveData: string = SaveLib.getSaveData(store);
    const [state, setState] = React.useContext(StateContext);
    const themeManager = state.themeManager;
    let [color, setColor] = React.useState(themeManager.colors);
    let [slider, setSlider] = React.useState(windowStateManager.opacity * 100);
    let len = themeManager.colors.length;

    let href = window.URL.createObjectURL(
        new Blob([saveData], {
            type: 'text/plain',
        }),
    );

    // Have theme manager update its values to reflect new color settings.
    themeManager.doUpdate();

    return (
        <div className="modal-container">
            <div className="modal-header-background">
                <h1>Settings</h1>
            </div>
            <a
                href={href}
                download={store.saveLib.saveFileName}
                onClick={() => {
                    store.saveLib.updateSaveFileName();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
                className="a-as-button"
            >
                Save Game
            </a>
            <LoadGameComponent />
            <div className="window-transparency-div">
                <p>Window Transparency: {windowStateManager.opacity}</p>
                <p>Click and drag the slider to modify the opacity of floating windows.</p>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={slider}
                    onChange={(e: any) => {
                        // Update our slider value display, stateful data model and refresh the play page that holds our floating windows.
                        let val = e.target.value;
                        setSlider(val);
                        windowStateManager.opacity = G_getFixedLengthNumber(val * 0.01);
                        __GLOBAL_REFRESH_PLAY_PAGE();
                    }}
                />
            </div>
            <button
                onClick={() => {
                    windowStateManager.embedCore = !windowStateManager.embedCore;
                    windowStateManager.resetWindows();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Toggle 'Main' window float state.
            </button>
            <button
                onClick={() => {
                    themeManager.useRed();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Use Red Theme
            </button>
            <button
                onClick={() => {
                    themeManager.useSoftBlue();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Use Soft Blue Theme
            </button>
            <button
                onClick={() => {
                    themeManager.useBlue();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Use Blue Theme
            </button>
            <button
                onClick={() => {
                    windowStateManager.resetWindows();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Reset Windows
            </button>
            <button
                onClick={() => {
                    windowStateManager.allowOffScreen = !windowStateManager.allowOffScreen;
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Toggle Floating Window Drag Area Constraints. (Advanced Feature)
            </button>
            <button
                onClick={() => {
                    store.debugMode = !store.debugMode;
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Toggle 'Debug/Cheat' Mode. (Advanced Feature)
            </button>
            <button
                onClick={() => {
                    themeManager.toggleCustomizeTheme();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Customize Theme (Advanced)
            </button>
            {themeManager.customizeTheme && (
                <div className="color-pickers">
                    {[...Array(len)].map((v, i) => {
                        return getColorPicker(themeManager, i, color, setColor);
                    })}
                </div>
            )}
            <QuitButtonComponent />
        </div>
    );
}
