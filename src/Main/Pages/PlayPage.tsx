/**
 * Our play page represents the game window that the player sees after exiting the intro.
 * It is the focal point for all other windows and player interactions.
 */

import React from 'react';
import MainButton from '../Components/Buttons/MainButton';
import FloatingWindow from '../Components/FloatingWindow/FloatingWindow';
import Character from '../WIndowContent/Character/Character';
import Combat from '../WIndowContent/Combat/Combat';
import { PageProps } from './SharedProps/PageBaseProps';
import { FloatingWindowProps } from '../Components/FloatingWindow/FloatingWindowProps';
import Inventory from '../WIndowContent/Inventory/Inventory';
import Equipment from '../WIndowContent/Equipment/Equipment';
import Console from '../WIndowContent/Console/Console';

export let __GLOBAL_REFRESH_FUNC_REF: Function;

const rowMod = 4;
const topInterval = 250;
const topIntervalDivisor = 250 * rowMod;
const leftInterval = 300;

interface FloatingWindowPropsBuilder {
    title: string;
    contentElement: JSX.Element;
    top?: number;
    left?: number;
}

interface PosData {
    data: number;
}

/**
 * Creates a final window object by calculating the top and left properties of a 'win' argument. Then, adds to our finalWindows array.
 */
function getWindowObject(pos: PosData, win: FloatingWindowPropsBuilder) {
    const p = pos.data;
    const topCellLayoutMod =
        topInterval * Math.floor((topInterval * p) / topIntervalDivisor);
    const topCellResetMod = Math.floor(p / 9) * 50;
    win['top'] =
        150 + (topCellLayoutMod % topIntervalDivisor) + topCellResetMod;
    win['left'] = 10 + leftInterval * (p % rowMod);
    pos.data++;
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
function getWindows(pos: PosData) {
    let counter = 0;
    let windows: Array<FloatingWindowPropsBuilder> = [
        {
            title: 'Player',
            contentElement: <Character usePlayer={true} />,
        },
        {
            title: 'Combat',
            contentElement: <Combat />,
        },
        {
            title: 'Enemy',
            contentElement: <Character usePlayer={false} />,
        },
        {
            title: 'Inventory',
            contentElement: <Inventory usePlayer={true} />,
        },
        {
            title: 'Equipment',
            contentElement: <Equipment usePlayer={true} />,
        },
        {
            title: 'Console',
            contentElement: <Console />,
        },
    ];

    // Calculate window positions and add to window objects.
    for (let win of windows) {
        getWindowObject(pos, win);
    }

    // Create list of windows to display on page.
    // Flex our skills a bit by using the 'as' keyword to convert our windows object to correct type.
    return (windows as Array<FloatingWindowProps>).map(
        (v: FloatingWindowProps) => {
            return (
                <div key={counter++}>
                    <FloatingWindow {...v} />
                </div>
            );
        },
    );
}

function forceRefresh(setRefreshVar: Function) {
    setRefreshVar((v: number) => v + 1);
}

export function PlayPage(props: PageProps) {
    // var inits
    let pos: PosData = { data: 0 }; // don't set as ref or state, no need for fancy integrations.
    const [refreshVar, setRefreshVar] = React.useState(0);
    __GLOBAL_REFRESH_FUNC_REF = () => {
        forceRefresh(setRefreshVar);
    };

    return (
        <div>
            <div>
                <h1>Loot Quest World Map!</h1>
            </div>

            <div>
                <MainButton
                    text="Reset Windows"
                    callBack={__GLOBAL_REFRESH_FUNC_REF}
                ></MainButton>
                <MainButton
                    text="Quit"
                    callBack={() => {
                        openIntroPage(props);
                    }}
                ></MainButton>
            </div>

            <div id="floating-window-container" key={refreshVar}>
                {getWindows(pos)}
            </div>
        </div>
    );
}
