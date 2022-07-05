/**
 * Our play page represents the game window that the player sees after existing the New Game Page.
 * It is the focal point for all other windows and player interactions.
 */

import React from 'react';
import FloatingWindow from '../Components/FloatingWindow/FloatingWindow';
import CharacterComponent from '../WIndowContent/Character/CharacterComponent';
import InventoryComponent from '../WIndowContent/Inventory/InventoryComponent';
import EquipmentComponent from '../WIndowContent/Equipment/EquipmentComponent';
import ConsoleComponent from '../WIndowContent/Console/ConsoleComponent';
import CheatComponent from '../WIndowContent/Cheat/CheatComponent';
import WindowStateManager from '../Models/Singles/WindowStateManager';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import Ability from '../WIndowContent/Ability/AbilityComponent';
import EmbeddedMainComponent from '../WIndowContent/EmbeddedWindow/EmbeddedMainComponent';
import FloatingMainComponent from '../WIndowContent/EmbeddedWindow/FloatingMainComponent';
import BaseModal from '../Modals/BaseModal';
import { SettingsComponent } from '../Modals/Content/SettingsComponent';
import { mdiCog, mdiInformationOutline } from '@mdi/js';
import IconButton from '../Components/IconButton/IconButton';
import QuitIconButtonComponent from './Components/QuitIconButtonComponent';
import { PageContainer } from './Enums/PageContainer';

export interface IFloatingWindowPropsBuilder {
    id?: number;
    title: string;
    contentElement: JSX.Element;
    top?: number;
    left?: number;
}

/**
 * Builds and returns our array of window content to display on the page.
 */
function getWindows(debugMode: boolean, windowStateManager: WindowStateManager) {
    let topBottomStart = 710;
    let windows: Array<IFloatingWindowPropsBuilder> = [];

    if (windowStateManager.embedCore === false) {
        windows.push({
            title: 'Main',
            contentElement: <FloatingMainComponent />,
            top: 110,
            left: 10,
        });
    }

    windows.push({
        title: 'Player',
        contentElement: <CharacterComponent usePlayer={true} />,
        top: topBottomStart,
        left: 10,
    });

    windows.push({
        title: 'Console',
        contentElement: <ConsoleComponent />,
        top: topBottomStart,
        left: 885,
    });

    windows.push({
        title: 'Ability',
        contentElement: <Ability />,
        top: topBottomStart,
        left: 450,
    });

    windows.push({
        title: 'Equipment',
        contentElement: <EquipmentComponent />,
        top: 10,
        left: 1050,
    });

    windows.push({
        title: 'Inventory',
        contentElement: <InventoryComponent />,
        top: 250,
        left: 1050,
    });

    if (debugMode) {
        windows.push({
            title: 'Cheat',
            contentElement: <CheatComponent />,
            top: 0,
            left: 500,
        });

        windows.push({
            title: 'Enemy',
            contentElement: <CharacterComponent usePlayer={false} />,
            top: topBottomStart + 350,
            left: 450,
        });
    }

    // Calculate window positions and add to window objects.
    let c: number = 0;

    for (let win of windows) {
        win.id = c;

        if (windowStateManager.isFree(c)) {
            windowStateManager.subscribe(win.id, win);
        }

        c++;
    }

    // Create list of windows to display on page.
    // Flex our skills a bit by using the 'as' keyword to convert our windows object to correct type.
    return windows.map((v: IFloatingWindowPropsBuilder, i: number) => {
        return (
            <div key={i}>
                <FloatingWindow id={i} contentElement={v.contentElement} />
            </div>
        );
    });
}

export function PlayPage() {
    let debugMode: boolean = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.debugMode);
    let windowStateManager: WindowStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.windowStateManager);
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <div>
            <h1>Loot Quest</h1>
            {/* Our main nav bar below logo. */}
            <div style={{ display: 'flex' }}>
                {/* Help button */}
                <IconButton
                    onClick={() => {
                        setPage(PageContainer.Help);
                    }}
                    path={mdiInformationOutline}
                    text="Help"
                />

                {/* Settings button + modal */}
                <BaseModal buttonText={'Settings'} iconPath={mdiCog} component={<SettingsComponent />} />

                {/* Quit Icon Button */}
                <QuitIconButtonComponent />
            </div>

            {/* All of our windows */}
            <div id="floating-window-container">{getWindows(debugMode, windowStateManager)}</div>

            {/* Embedded main component IF 'embed' setting is toggled by user. */}
            {windowStateManager.embedCore && (
                <span>
                    <hr /> <EmbeddedMainComponent />
                </span>
            )}
        </div>
    );
}
