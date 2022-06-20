/**
 * The Settings page provides the user with interfaces to modify certain game settings.
 */

import * as React from 'react';
import { IRootStore, __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import WindowStateManager from '../Models/Singles/WindowStateManager';
import QuitButtonComponent from './Components/QuitButtonComponent';
import IPageEnum from './Enums/IPageEnum';
import LoadGameComponent from './Components/LoadGame/LoadGameComponent';
import { __GLOBAL_REFRESH_FUNC_REF } from '../App';
import { SaveLib } from '../Models/SaveLib';
import { G_getFixedLengthNumber } from '../Models/Helper';

export default function SettingsPage() {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA: any) => __DATA);
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    // let rpgConsole: RpgConsole = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.rpgConsole);
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    // let downloadRef = React.useRef(null);
    let saveData: string = SaveLib.getSaveData(store);

    let href = window.URL.createObjectURL(
        new Blob([saveData], {
            type: 'text/plain',
        }),
    );

    return (
        <div>
            <br />
            <h1>Settings</h1>
            <h2>Access Game Settings here</h2>
            <div className="a-as-button-container">
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
            </div>
            <LoadGameComponent />
            <button
                onClick={() => {
                    windowStateManager.resetWindows();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Reset Window Positions
            </button>
            <div className="window-transparency-div">
                <p>Window Transparency: {windowStateManager.opacity}</p>
                <p>Click the slider to modify window opacity values.</p>
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
                    setPage(IPageEnum.Play);
                }}
            >
                Back to Game
            </button>
            <br />
            <QuitButtonComponent />
        </div>
    );
}
