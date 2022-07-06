import React from 'react';
import HelpModal from '../../Modals/Content/HelpModal';
import MainMenuPage from '../MainMenu';
import NewGamePage from '../NewGamePage';
import { PlayPage } from '../PlayPage';
import { Page } from './Page';

export class PageContainer {
    static MainMenu = new Page(<MainMenuPage />, true);
    static NewGame = new Page(<NewGamePage />, false);
    static Play = new Page(<PlayPage />, false);
}
