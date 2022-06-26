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
import './Settings.css';
import { HexColorPicker } from 'react-colorful';
import ThemeManager from '../../Models/Singles/ThemeManager';

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
    let themeManager: ThemeManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.themeManager);
    let [color, setColor] = React.useState(themeManager.colors);
    let len = themeManager.colors.length;

    for (var i = 0; i < len; i++) {
        document.documentElement.style.setProperty('--main-color-' + i, themeManager.colors[i]);
    }

    let href = window.URL.createObjectURL(
        new Blob([saveData], {
            type: 'text/plain',
        }),
    );

    return (
        <div className="settings">
            <div className="settings-h1">
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
                <p>Click the slider to modify the opacity of floating windows.</p>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={windowStateManager.opacity * 100}
                    onChange={(e: any) => {
                        windowStateManager.opacity = G_getFixedLengthNumber(e.target.value * 0.01);
                        __GLOBAL_REFRESH_FUNC_REF();
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
                    themeManager.useBlue();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Use Blue Theme
            </button>

            <button
                onClick={() => {
                    windowStateManager.allowResize = !windowStateManager.allowResize;
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Toggle Window Resizing (Advanced Feature)
            </button>
            {windowStateManager.allowResize && (
                <button
                    onClick={() => {
                        windowStateManager.resetWindows();
                        __GLOBAL_REFRESH_FUNC_REF();
                    }}
                >
                    Reset Window Positions
                </button>
            )}
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
            <br />
            <QuitButtonComponent />
        </div>
    );
}
