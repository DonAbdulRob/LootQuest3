import React from 'react';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';

export interface Line {
    text: string;
    time: string;
}

export function getFormattedTime(x: number) {
    if (x < 10) {
        return '0' + x;
    }
    return x;
}

export default function ConsoleComponent() {
    let rpgConsole = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.rpgConsole);

    return (
        <div className="window-core">
            <h1>Console</h1>
            {rpgConsole.get()}
        </div>
    );
}
