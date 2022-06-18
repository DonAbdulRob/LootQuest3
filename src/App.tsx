/**
 * The main component handles the highest-level routing of pages based on user interaction.
 * See the 'Pages' folder for various pages.
 */

import * as React from 'react';
import { __GLOBAL_GAME_STORE } from './Models/GlobalGameStore';
import HelpPage from './Pages/HelpPage';
import MainMenuPage from './Pages/MainMenu';
import NewGamePage from './Pages/NewGamePage';
import { PlayPage } from './Pages/PlayPage';
import SettingsPage from './Pages/SettingsPage';
import IPageEnum from './Pages/Enums/IPageEnum';

export const _GAME_IN_DEBUG_MODE = true;

function getDesiredPage(page: IPageEnum): JSX.Element {
    switch (page) {
        case IPageEnum.MainMenu:
            return <MainMenuPage />;
        case IPageEnum.NewGame:
            return <NewGamePage />;
        case IPageEnum.Play:
            return <PlayPage />;
        case IPageEnum.Settings:
            return <SettingsPage />;
        case IPageEnum.Help:
            return <HelpPage />;
        default:
            return <MainMenuPage />;
    }
}

export default function App(): JSX.Element {
    let page: IPageEnum = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.page);

    return (
        <div className="app">
            <h1>Loot Quest</h1>
            {getDesiredPage(page)}
        </div>
    );
}
