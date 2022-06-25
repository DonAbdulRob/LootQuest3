/**
 * The Settings page provides the user with interfaces to modify certain game settings.
 */
import React from 'react';
import { __GLOBAL_REFRESH_FUNC_REF } from '../App';
import { IRootStore, __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { G_getFixedLengthNumber } from '../Models/Helper';
import { SaveLib } from '../Models/SaveLib';
import WindowStateManager from '../Models/Singles/WindowStateManager';
import LoadGameComponent from '../Pages/Components/LoadGame/LoadGameComponent';
import QuitButtonComponent from '../Pages/Components/QuitButtonComponent';
import './Settings.css';

export function SettingsComponent() {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA: any) => __DATA);
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    let saveData: string = SaveLib.getSaveData(store);

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
                Toggle 'Core' window float state.
            </button>
            <br />
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
            <br />
            <button
                onClick={() => {
                    store.modalStateManager.toggleVisible();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Back to Game
            </button>
            <br />
            <QuitButtonComponent />
        </div>
    );
}
