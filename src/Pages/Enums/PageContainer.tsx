import React from 'react';
import HelpPage from '../HelpPage';
import MainMenuPage from '../MainMenu';
import NewGamePage from '../NewGamePage';
import { PlayPage } from '../PlayPage';
import { Page } from './Page';

export class PageContainer {
    static MainMenu = new Page(<MainMenuPage />, true);
    static NewGame = new Page(<NewGamePage />, true);
    static Play = new Page(<PlayPage />, false);
    static Help = new Page(<HelpPage />, false);
}
