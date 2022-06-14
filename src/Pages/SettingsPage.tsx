/**
 * The intro page is what the player sees immediately upon starting the game (perhaps add animation to start one day?)
 */

import * as React from 'react';
import { Player } from '../Models/Fighter/Player';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { G_MONTHS_ARR, getPaddedToTwoDigits } from '../Models/Helper';
import WindowStateManager from '../Models/Singles/WindowStateManager';
import { ConsoleData } from '../WIndowContent/Console/ConsoleComponent';
import LoadGame from './Components/LoadGame';
import QuitButton from './Components/QuitButton';
import { __GLOBAL_REFRESH_FUNC_REF } from './PlayPage';
import { G_GO_TO_PAGE } from './SharedProps/GoToPageFunc';
import { PageProps } from './SharedProps/PageBaseProps';
import { PageEnum } from './SharedProps/PageEnum';

export default function SettingsPage(props: PageProps) {
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let consoleData: ConsoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);

    return (
        <div>
            <br />
            <h1>Settings</h1>
            <h2>Access Game Settings here</h2>
            <br />
            <button
                onClick={() => {
                    var a = document.createElement('a');
                    a.href = window.URL.createObjectURL(
                        new Blob([player.getJSON()], {
                            type: 'text/plain',
                        }),
                    );

                    let now = new Date();

                    let nowStr: string =
                        G_MONTHS_ARR[now.getMonth()] +
                        '_' +
                        getPaddedToTwoDigits(now.getDate()) +
                        '_' +
                        now.getFullYear() +
                        '_' +
                        getPaddedToTwoDigits(now.getHours()) +
                        '_' +
                        getPaddedToTwoDigits(now.getMinutes()) +
                        '_' +
                        getPaddedToTwoDigits(now.getSeconds());

                    a.download = 'Loot_Quest_' + nowStr + '.txt';
                    a.click();
                    consoleData.add('Game saved.');
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Save
            </button>
            <br />
            <br />
            <LoadGame />
            <br />
            <button
                onClick={() => {
                    windowStateManager.resetWindows();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Reset Window Positions
            </button>
            <br />
            Window Transparency
            <input
                type="range"
                min="10"
                max="100"
                value={windowStateManager.opacity * 100}
                onChange={(e: any) => {
                    windowStateManager.opacity = e.target.value * 0.01;
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            />
            <br />
            <button
                onClick={() => {
                    G_GO_TO_PAGE(props, PageEnum.Play);
                }}
            >
                Back to Game
            </button>
            <br />
            <QuitButton page={props.page} setPage={props.setPage} />
        </div>
    );
}
