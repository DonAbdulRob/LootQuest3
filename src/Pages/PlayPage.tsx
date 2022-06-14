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
import Console from '../WIndowContent/Console/Console';
import Cheat from '../WIndowContent/Cheat/Cheat';
import WindowStateManager from '../Models/Singles/WindowStateManager';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { _GAME_IN_DEBUG_MODE } from '../App';
import Ability from '../WIndowContent/Ability/Ability';
import { PageEnum } from './SharedProps/PageEnum';
import { G_GO_TO_PAGE as GO_TO_PAGE } from './SharedProps/GoToPageFunc';
import QuitButton from './Components/QuitButton';

export let __GLOBAL_REFRESH_FUNC_REF: Function;

export interface FloatingWindowPropsBuilder {
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
            top: 0,
            left: 800,
        });

        windows.push({
            title: 'Enemy',
            contentElement: <Character usePlayer={false} />,
            top: 600,
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
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    __GLOBAL_REFRESH_FUNC_REF = () => {
        forceRefresh(setRefreshVar);
    };

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        GO_TO_PAGE(props, PageEnum.Help);
                    }}
                >
                    Help
                </button>
                <button
                    onClick={() => {
                        GO_TO_PAGE(props, PageEnum.Settings);
                    }}
                >
                    Settings
                </button>
                <QuitButton page={props.page} setPage={props.setPage} />
            </div>
            <div id="floating-window-container" key={refreshVar}>
                {getWindows(windowStateManager)}
            </div>

            <hr />
            {getDesiredContent()}
        </div>
    );
}
