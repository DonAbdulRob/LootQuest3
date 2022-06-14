/**
 * The main component handles the highest-level routing of pages based on user interaction.
 * See the 'Pages' folder for various pages.
 */

import * as React from 'react';
import HelpPage from './Pages/HelpPage';
import MainMenuPage from './Pages/MainMenu';
import NewGamePage from './Pages/NewGamePage';
import { PlayPage } from './Pages/PlayPage';
import SettingsPage from './Pages/SettingsPage';
import { PageProps } from './Pages/SharedProps/PageBaseProps';
import { PageEnum } from './Pages/SharedProps/PageEnum';

export const _GAME_IN_DEBUG_MODE = true;

function getDesiredPage(currentPage: number, setPage: Function): JSX.Element {
    let data: PageProps = {
        page: currentPage,
        setPage: setPage,
    };

    switch (currentPage) {
        case PageEnum.MainMenu:
            return <MainMenuPage {...data} />;
        case PageEnum.NewGame:
            return <NewGamePage {...data} />;
        case PageEnum.Play:
            return <PlayPage {...data} />;
        case PageEnum.Settings:
            return <SettingsPage {...data} />;
        case PageEnum.Help:
            return <HelpPage {...data} />;
        default:
            return <MainMenuPage {...data} />;
    }
}

export default function App(): JSX.Element {
    // Page Enum tracks game page.
    const [page, setPage] = React.useState(PageEnum.Play);

    return (
        <div className="app">
            <h1>Loot Quest</h1>
            {getDesiredPage(page, setPage)}
        </div>
    );
}
