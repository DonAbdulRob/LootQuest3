/**
 * The intro page is what the player sees immediately upon starting the game (perhaps add animation to start one day?)
 */

import * as React from 'react';
import LoadGame from './Components/LoadGame';
import { G_GO_TO_PAGE } from './SharedProps/GoToPageFunc';
import { PageProps } from './SharedProps/PageBaseProps';
import { PageEnum } from './SharedProps/PageEnum';

export default function MainMenuPage(props: PageProps) {
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
                        G_GO_TO_PAGE(props, PageEnum.NewGame);
                    }}
                >
                    Start A New Adventure
                </button>
                <LoadGame />
            </div>
        </div>
    );
}
