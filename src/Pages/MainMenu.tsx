/**
 * The intro page is what the player sees immediately upon starting the game.
 */

import * as React from 'react';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import LoadGameComponent from './Components/LoadGame/LoadGameComponent';
import IPageEnum from './Enums/IPageEnum';

export default function MainMenuPage() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <div className="container">
            <hr />
            <div className="mb-1">
                <br />
            </div>

            <div className="p-5 mb-2 bg-primary text-white rounded">
                <h1 className="mt-5 mb-5 text-center">Welcome to LootQuest 2!</h1>
            </div>
            <br />
            <br />

            <div className="center">
                <button
                    onClick={() => {
                        setPage(IPageEnum.NewGame);
                    }}
                >
                    Start A New Adventure
                </button>
                <LoadGameComponent />
            </div>
        </div>
    );
}
