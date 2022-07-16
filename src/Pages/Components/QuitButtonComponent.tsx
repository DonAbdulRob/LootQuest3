/**
 * The Quit button provides a reuseable method to return to the Main Menu.
 */
import React from 'react';
import { G_RESET_GAME_STORE, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { PageContainer } from '../Enums/PageContainer';

export default function QuitButtonComponent() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <button
            onClick={() => {
                setPage(PageContainer.MainMenu);
                G_RESET_GAME_STORE();
            }}
        >
            Quit
        </button>
    );
}
