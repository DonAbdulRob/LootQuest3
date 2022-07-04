/**
 * The intro page is what the player sees immediately upon starting the game.
 */

import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import * as React from 'react';
import BannerComponent from '../Components/BannerComponent/BannerComponent';
import { iconSizeStr, __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import LoadGameComponent from './Components/LoadGame/LoadGameComponent';
import { PageContainer } from './Enums/PageContainer';
import './MainMenu.css';

export default function MainMenuPage() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <div className="main-game-container">
            <hr />

            <BannerComponent />

            <button
                className={'button-with-icon'}
                onClick={() => {
                    setPage(PageContainer.NewGame);
                }}
            >
                <Icon className={'button-with-icon'} path={mdiPlus} size={iconSizeStr} />
                <p className="glowing-text">Start a New Adventure</p>
                <Icon className={'button-with-icon'} path={mdiPlus} size={iconSizeStr} />
            </button>

            <LoadGameComponent />

            <div>
                <p>Created By: Donald Abdullah-Robinson</p>
            </div>

            <hr />
        </div>
    );
}
