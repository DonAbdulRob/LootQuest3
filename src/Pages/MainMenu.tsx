/**
 * The intro page is what the player sees immediately upon starting the game.
 */

import { mdiInformationOutline, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import * as React from 'react';
import BannerComponent from '../Components/BannerComponent/BannerComponent';
import BaseModal from '../Modals/BaseModal';
import HelpModal from '../Modals/Content/HelpModal';
import { iconSizeStr, __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import ModalStateManager from '../Models/Singles/ModalStateManager';
import LoadGameComponent from './Components/LoadGame/LoadGameComponent';
import { PageContainer } from './Enums/PageContainer';
import './MainMenu.css';

export default function MainMenuPage() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <div className="main-game-container">
            <hr />

            {/* Banner */}
            <BannerComponent />

            {/* Start adventure button. */}
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

            {/* Load Game Bar */}
            <LoadGameComponent />

            {/* Credits */}
            <div>
                <p>Created By: Donald Abdullah-Robinson</p>
            </div>

            {/* Help button in modal */}
            <BaseModal
                id={ModalStateManager.playHelpId}
                buttonText={'Game Help'}
                iconPath={mdiInformationOutline}
                component={<HelpModal />}
            />

            <hr />
        </div>
    );
}
