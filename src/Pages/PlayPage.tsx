/**
 * Our play page represents the game window that the player sees after exiting the intro.
 * It is the focal point for all other windows and player interactions.
 */

import React from 'react';
import FloatingWindow from '../Components/FloatingWindow/FloatingWindow';
import Character from '../WIndowContent/Character/Character';
import Combat from '../WIndowContent/Combat/Combat';
import { PageProps } from './SharedProps/PageBaseProps';
import Inventory from '../WIndowContent/Inventory/Inventory';
import Equipment from '../WIndowContent/Equipment/Equipment';
import Console, { ConsoleData } from '../WIndowContent/Console/Console';
import Cheat from '../WIndowContent/Cheat/Cheat';
import WindowStateManager from '../Models/Singles/WindowStateManager';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { getPaddedToTwoDigits, G_MONTHS_ARR } from '../Models/Helper';
import { _GAME_IN_DEBUG_MODE } from '../App';
import Ability from '../WIndowContent/Ability/Ability';
import { Player } from '../Models/Fighter/Player';

export let __GLOBAL_REFRESH_FUNC_REF: Function;

export interface FloatingWindowPropsBuilder {
    id?: number;
    title: string;
    contentElement: JSX.Element;
    top?: number;
    left?: number;
}

/**
 *  Use our setPage function to change game page back to intro.
 */
function openIntroPage(props: PageProps) {
    props.setPage(0);
}

/**
 * Builds and returns our array of window content to display on the page.
 */
function getWindows(windowStateManager: WindowStateManager) {
    let windows: Array<FloatingWindowPropsBuilder> = [
        {
            title: 'Player',
            contentElement: <Character usePlayer={true} />,
            top: 110,
            left: 10,
        },
        {
            title: 'Console',
            contentElement: <Console />,
            top: 450,
            left: 10,
        },
        {
            title: 'Ability',
            contentElement: <Ability />,
            top: 450,
            left: 510,
        },
        {
            title: 'Equipment',
            contentElement: <Equipment />,
            top: 110,
            left: 1200,
        },
        {
            title: 'Inventory',
            contentElement: <Inventory />,
            top: 350,
            left: 1200,
        },
    ];

    if (_GAME_IN_DEBUG_MODE) {
        windows.push({
            title: 'Cheat',
            contentElement: <Cheat />,
            top: 100,
            left: 100,
        });

        windows.push({
            title: 'Enemy',
            contentElement: <Character usePlayer={false} />,
            top: 100,
            left: 100,
        });
    }

    // Calculate window positions and add to window objects.
    let c: number = 0;

    for (let win of windows) {
        win.id = c;

        if (windowStateManager.isFree(c)) {
            windowStateManager.subscribe(win.id, win);
        }

        c++;
    }

    // Create list of windows to display on page.
    // Flex our skills a bit by using the 'as' keyword to convert our windows object to correct type.
    return windows.map((v: FloatingWindowPropsBuilder, i: number) => {
        return (
            <div key={i}>
                <FloatingWindow id={i} contentElement={v.contentElement} />
            </div>
        );
    });
}

function forceRefresh(setRefreshVar: Function) {
    setRefreshVar((v: number) => v + 1);
}

function getDesiredContent() {
    return <Combat />;
}

export function PlayPage(props: PageProps) {
    // var inits
    const [refreshVar, setRefreshVar] = React.useState(0);
    __GLOBAL_REFRESH_FUNC_REF = () => {
        forceRefresh(setRefreshVar);
    };
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let consoleData: ConsoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);

    return (
        <div>
            <div>
                <h1>Loot Quest</h1>
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
                Load:{' '}
                <input
                    type="file"
                    onChange={(e: any) => {
                        let file = e.target.files[0];
                        let reader = new FileReader();

                        reader.addEventListener('load', function (e1: any) {
                            player.fromJSON(e1.target.result);
                            consoleData.add('Game loaded.');
                            __GLOBAL_REFRESH_FUNC_REF();
                        });

                        reader.readAsText(file);
                    }}
                ></input>
                <button
                    onClick={() => {
                        windowStateManager.resetWindows();
                        __GLOBAL_REFRESH_FUNC_REF();
                    }}
                >
                    Reset Windows
                </button>
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
                <button
                    onClick={() => {
                        openIntroPage(props);
                    }}
                >
                    Quit
                </button>
            </div>
            <div id="floating-window-container" key={refreshVar}>
                {getWindows(windowStateManager)}
            </div>

            <hr />
            {getDesiredContent()}
        </div>
    );
}
