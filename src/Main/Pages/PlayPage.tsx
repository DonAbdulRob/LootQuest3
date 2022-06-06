/**
 * Our play page represents the game window that the player sees after exiting the intro.
 * It is the focal point for all other windows and player interactions.
 */

import React from "react";
import Fighter from "../Models/Fighter/Fighter";
import MainButton from "../Components/Buttons/MainButton";
import FloatingWindow from "../Components/FloatingWindow/FloatingWindow";
import Character from "../WIndowContent/Character/Character";
import Combat from "../WIndowContent/Combat/Combat";
import { PageProps } from "./SharedProps/PageBaseProps";
import { FloatingWindowProps } from "../Components/FloatingWindow/FloatingWindowProps";
import Inventory from "../WIndowContent/Inventory/Inventory";
import Equipment from "../WIndowContent/Equipment/Equipment";
import CombatState, { CombatStateEnum } from "../Models/Shared/CombatState";
import Console, { ConsoleData } from "../WIndowContent/Console/Console";

const topInterval = 250;
const topIntervalDivisor = 250 * 3;
const leftInterval = 400;

 interface FloatingWindowPropsBuilder {
    title: string
    contentElement: JSX.Element
    top?: number
    left?: number
}

interface PosData {
    data: number
}

/**
 * Creates a final window object by calculating the top and left properties of a 'win' argument. Then, adds to our finalWindows array.
 */
function getWindowObject(pos: PosData, win: FloatingWindowPropsBuilder) {
    const p = pos.data;
    const topCellLayoutMod = (topInterval * (Math.floor((topInterval * p / (topIntervalDivisor)))));
    const topCellResetMod = (Math.floor((p / 9)) * 50);
    win["top"] = 150 + (topCellLayoutMod % topIntervalDivisor) + topCellResetMod;
    win["left"] = 10 + (leftInterval * (p % 3));
    pos.data++;
}

// Use our setPage function to change game page back to intro.
function openIntroPage(props: PageProps) {
    props.setPage(0);
}

/**
 * Builds and returns our array of window content to display on the page.
 */
function getWindows(pos: PosData, player: Fighter, setPlayer: Function, enemy: Fighter, setEnemy: Function,
    combatState: CombatState, setCombatState: Function, combatLog: ConsoleData, setCombatLog: Function) {
    let counter = 0;
    let windows: Array<FloatingWindowPropsBuilder> = [
        {
            title: "Player",
            contentElement: <Character {...{fighter: player, setFighter: setPlayer}} />
        },
        {
            title: "Combat",
            contentElement: <Combat { ...{ player: player, enemy: enemy, setPlayer: setPlayer,
                    setEnemy: setEnemy, combatState: combatState, setCombatState: setCombatState,
                    combatLog: combatLog, setCombatLog: setCombatLog
                }}
            />
        },
        {
            title: "Enemy",
            contentElement: <Character {...{fighter: enemy, setFighter: setEnemy}} />
        },
        {
            title: "Inventory",
            contentElement: <Inventory { ...{ fighter: player, setFighter: setPlayer }}/>
        },
        {
            title: "Equipment",
            contentElement: <Equipment { ...{ fighter: player, setFighter: setPlayer }}/>
        },
        {
            title: "Console",
            contentElement: <Console { ...{ consoleData: combatLog, setConsoleDate: setCombatLog }}/>
        }
    ];

    // Calculate window positions and add to window objects.
    for (let win of windows) {
        getWindowObject(pos, win);
    }

    // Create list of windows to display on page.
    // Flex our skills a bit by using the 'as' keyword to convert our windows object to correct type.
    return (windows as Array<FloatingWindowProps>).map((v: FloatingWindowProps) => {
        return <div key={counter++}>
            <FloatingWindow {...v} />
        </div>;
    });
}

/**
 * See archiecture.md for why we use force refresh here instead of other options. (Ctrl+f code: 95821)
 */
function startFight(combatState: CombatState, doForceRefresh: Function) {
    if (combatState.combatState === CombatStateEnum.OUT_OF_COMBAT) {
        combatState.advance();
        doForceRefresh();
    }
}

function forceRefresh(setRefreshVar: Function) {
    setRefreshVar((v: number) => v + 1);
}

export let refreshRef: Function;

export function PlayPage(props: PageProps) {
    // let init.
    const [player, setPlayer] = React.useState(new Fighter(true));
    const [enemy, setEnemy] = React.useState(new Fighter(false));
    const [combatState, setCombatState] = React.useState(new CombatState());
    const [combatLog, setCombatLog]: [ConsoleData, Function] = React.useState(new ConsoleData());
    let pos: PosData = { data: 0 }; // don't set as ref or state, no need for fancy integrations.

    const [refreshVar, setRefreshVar] = React.useState(0);
    const doForceRefresh = () => { forceRefresh(setRefreshVar) };
    refreshRef = doForceRefresh;
    
    // Contains main window management render
    return <div>
        <div>
            <h1>Loot Quest World Map!</h1>
        </div>
        
        <div>
            <MainButton text="Find Fight" callBack={() => { startFight(combatState, doForceRefresh) }}></MainButton>
            <MainButton text="Reset Windows" callBack={doForceRefresh}></MainButton>
            <MainButton text="Quit" callBack={() => { openIntroPage(props); }}></MainButton>
        </div>
        
        <div id="floating-window-container" key={refreshVar}>
            {getWindows(pos, player, setPlayer, enemy, setEnemy, combatState, setCombatState, combatLog, setCombatLog)}
        </div>
    </div>;
}
