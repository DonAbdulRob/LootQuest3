/**
 * The intro page is what the player sees immediately upon starting the game (perhaps add animation to start one day?)
 */

import * as React from 'react';
import { Player } from '../Models/Fighter/Player';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { DifficultyEnum } from '../Models/Singles/GameDifficulty';
import GameStateManager from '../Models/Singles/GameStateManager';
import { G_GO_TO_PAGE } from './SharedProps/GoToPageFunc';
import { PageProps } from './SharedProps/PageBaseProps';
import { PageEnum } from './SharedProps/PageEnum';

function forceRefresh(setRefreshVar: Function) {
    setRefreshVar((v: number) => v + 1);
}

export default function NewGamePage(props: PageProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [refreshVar, setRefreshVar] = React.useState(0);
    let fighter: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let setPlayerName: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPlayerName);
    let gameStateManager: GameStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.gameStateManager);

    let keys = Object.keys(DifficultyEnum);
    let difficulty = gameStateManager.gameDifficulty.difficulty;
    let desc = gameStateManager.gameDifficulty.getDifficultyData().description;
    let names = [];

    for (var i = keys.length * 0.5; i < keys.length; i++) {
        names.push(keys[i]);
    }
    let difficultyStr = names[difficulty];

    return (
        <div className="container">
            <h1>Welcome!</h1>
            <h2>Here, you can choose your character's name.</h2>
            <hr />
            <h1>Character Name</h1>
            <input
                type="text"
                placeholder="name"
                value={fighter.name}
                onChange={(e: any) => {
                    let input = e.target.value;

                    if (input.length > 16) {
                        input = input.substring(0, 16);
                    }

                    setPlayerName(input);
                }}
            ></input>
            <br />
            <br />
            <h1>Difficulty - {difficultyStr}</h1>
            <h2>{desc}</h2>
            {names.map((v: string, i: number) => {
                return (
                    <button
                        onClick={() => {
                            gameStateManager.gameDifficulty.difficulty = i;
                            forceRefresh(setRefreshVar);
                        }}
                    >
                        {v}
                    </button>
                );
            })}
            <br />
            <br />
            <button
                onClick={() => {
                    G_GO_TO_PAGE(props, PageEnum.Play);
                }}
            >
                Finish
            </button>
            <br />
            <br />
            <p>... What? You wanted more?</p>
            <br />
            <p>Too bad! No freebies. Earn your class, abilities and traits in-game!</p>
        </div>
    );
}
