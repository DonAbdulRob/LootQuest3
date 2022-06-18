/**
 * Our play page represents the game window that the player sees after exiting the intro.
 * It is the focal point for all other windows and player interactions.
 */

import React from 'react';
import FloatingWindow from '../Components/FloatingWindow/FloatingWindow';
import CharacterComponent from '../WIndowContent/Character/CharacterComponent';
import InventoryComponent from '../WIndowContent/Inventory/InventoryComponent';
import EquipmentComponent from '../WIndowContent/Equipment/EquipmentComponent';
import ConsoleComponent from '../WIndowContent/Console/ConsoleComponent';
import CheatComponent from '../WIndowContent/Cheat/CheatComponent';
import WindowStateManager from '../Models/Singles/WindowStateManager';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { _GAME_IN_DEBUG_MODE } from '../App';
import Ability from '../WIndowContent/Ability/AbilityComponent';
import IPageEnum from './Enums/IPageEnum';
import QuitButtonComponent from './Components/QuitButtonComponent';
import EmbeddedWindowComponent from '../WIndowContent/EmbeddedWindow/EmbeddedWindowComponent';

export let __GLOBAL_REFRESH_FUNC_REF: Function;

export interface IFloatingWindowPropsBuilder {
    id?: number;
    title: string;
    contentElement: JSX.Element;
    top?: number;
    left?: number;
}

/**
 * Builds and returns our array of window content to display on the page.
 */
function getWindows(windowStateManager: WindowStateManager) {
    let secondRowStart = 500;

    let windows: Array<IFloatingWindowPropsBuilder> = [
        {
            title: 'Player',
            contentElement: <CharacterComponent usePlayer={true} />,
            top: 110,
            left: 10,
        },
        {
            title: 'Console',
            contentElement: <ConsoleComponent />,
            top: secondRowStart,
            left: 10,
        },
        {
            title: 'Ability',
            contentElement: <Ability />,
            top: secondRowStart,
            left: 510,
        },
        {
            title: 'Equipment',
            contentElement: <EquipmentComponent />,
            top: 110,
            left: 1200,
        },
        {
            title: 'Inventory',
            contentElement: <InventoryComponent />,
            top: 350,
            left: 1200,
        },
    ];

    if (_GAME_IN_DEBUG_MODE) {
        windows.push({
            title: 'Cheat',
            contentElement: <CheatComponent />,
            top: 0,
            left: 800,
        });

        windows.push({
            title: 'Enemy',
            contentElement: <CharacterComponent usePlayer={false} />,
            top: secondRowStart + 150,
            left: 510,
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
    return windows.map((v: IFloatingWindowPropsBuilder, i: number) => {
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

export function PlayPage() {
    // var inits
    const [refreshVar, setRefreshVar] = React.useState(0);
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    __GLOBAL_REFRESH_FUNC_REF = () => {
        forceRefresh(setRefreshVar);
    };
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        setPage(IPageEnum.Help);
                    }}
                >
                    Help
                </button>
                <button
                    onClick={() => {
                        setPage(IPageEnum.Settings);
                    }}
                >
                    Settings
                </button>
                <QuitButtonComponent />
            </div>
            <div id="floating-window-container" key={refreshVar}>
                {getWindows(windowStateManager)}
            </div>

            <hr />
            {<EmbeddedWindowComponent />}
        </div>
    );
}
