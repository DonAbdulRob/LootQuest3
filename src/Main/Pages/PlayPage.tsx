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
 * Resets all window positions on click by changing the key associated with their parent container.
 * Algorithm flips key between 0 and 1.
 */
function resetWindows(uniqueKey: number, setUniqueKey: Function) {
    setUniqueKey((uniqueKey + 1) % 2);
}

/**
 * Builds and returns our array of window content to display on the page.
 */
function getWindows(pos: PosData, player: Fighter, setPlayer: Function, enemy: Fighter, setEnemy: Function) {
    let counter = 0;
    let windows: Array<FloatingWindowPropsBuilder> = [
        {
            title: "Player",
            contentElement: <Character {...{fighter: player, setFighter: setPlayer}} />
        },
        {
            title: "Enemy",
            contentElement: <Character {...{fighter: enemy, setFighter: setEnemy}} />
        },
        {
            title: "Combat",
            contentElement: <Combat { ...{ player: player, enemy: enemy, setPlayer: setPlayer, setEnemy: setEnemy}}/>
        },
        {
            title: "Inventory",
            contentElement: <Inventory { ...{ fighter: player, setFighter: setPlayer }}/>
        },
        {
            title: "Equipment",
            contentElement: <Equipment { ...{ fighter: player, setFighter: setPlayer }}/>
        }
    ];

    // Calculate window positions and add to window objects.
    for (var win of windows) {
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

export function PlayPage(props: PageProps) {
    // Var init.
    const [uniqueKey, setUniqueKey] = React.useState(0);
    const [player, setPlayer] = React.useState(new Fighter(true));
    const [enemy, setEnemy] = React.useState(new Fighter(false));
    let pos: PosData = { data: 0 }; // don't set as ref or state, no need for fancy integrations.

    // Contains main window management render
    return <div>
        <div>
            <h1>Loot Quest World Map!</h1>
            {player.name}
        </div>
        
        <div>
            <MainButton text="Reset Windows" callBack={() => { pos.data = 0; resetWindows(uniqueKey, setUniqueKey); }}></MainButton>
            <MainButton text="Quit" callBack={() => { openIntroPage(props); }}></MainButton>
        </div>
        
        <div id="floating-window-container" key={uniqueKey}>
            {getWindows(pos, player, setPlayer, enemy, setEnemy)}
        </div>
    </div>;
}
