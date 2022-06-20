/**
 * The Quit button provides a reuseable method to return to the Main Menu.
 */
import React from 'react';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import IPageEnum from '../Enums/IPageEnum';

export default function QuitButtonComponent() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <button
            onClick={() => {
                setPage(IPageEnum.MainMenu);
            }}
        >
            Quit to Main Menu
        </button>
    );
}
