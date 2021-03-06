/**
 * The Quit button provides a reuseable method to return to the Main Menu.
 */
import { mdiClose } from '@mdi/js';
import React from 'react';
import IconButton from '../../Components/IconButton/IconButton';
import { G_RESET_GAME_STORE, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { PageContainer } from '../Enums/PageContainer';

export default function QuitIconButtonComponent() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <IconButton
            onClick={() => {
                setPage(PageContainer.MainMenu);
                G_RESET_GAME_STORE();
            }}
            path={mdiClose}
            text="Quit"
        />
    );
}
