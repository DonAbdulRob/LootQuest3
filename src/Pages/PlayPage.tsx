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
import EmbeddedMainComponent from '../WIndowContent/EmbeddedWindow/EmbeddedMainComponent';
import FloatingMainComponent from '../WIndowContent/EmbeddedWindow/FloatingMainComponent';

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
    let topBottomStart = 400;

    let windows: Array<IFloatingWindowPropsBuilder> = [];

    if (windowStateManager.embedCore === false) {
        windows.push({
            title: 'Main',
            contentElement: <FloatingMainComponent />,
            top: 110,
            left: 10,
        });
    }
    windows.push({
        title: 'Player',
        contentElement: <CharacterComponent usePlayer={true} />,
        top: topBottomStart,
        left: 10,
    });
    windows.push({
        title: 'Console',
        contentElement: <ConsoleComponent />,
        top: topBottomStart + 165,
        left: 450,
    });
    windows.push({
        title: 'Ability',
        contentElement: <Ability />,
        top: topBottomStart,
        left: 450,
    });
    windows.push({
        title: 'Equipment',
        contentElement: <EquipmentComponent />,
        top: 10,
        left: 1050,
    });
    windows.push({
        title: 'Inventory',
        contentElement: <InventoryComponent />,
        top: 300,
        left: 1050,
    });

    if (_GAME_IN_DEBUG_MODE) {
        windows.push({
            title: 'Cheat',
            contentElement: <CheatComponent />,
            top: 0,
            left: 500,
        });

        windows.push({
            title: 'Enemy',
            contentElement: <CharacterComponent usePlayer={false} />,
            top: topBottomStart + 350,
            left: 450,
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

export function PlayPage() {
    // var inits
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
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
            <div id="floating-window-container">{getWindows(windowStateManager)}</div>

            {windowStateManager.embedCore && (
                <span>
                    <hr /> <EmbeddedMainComponent />
                </span>
            )}
        </div>
    );
}
