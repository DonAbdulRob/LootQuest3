/**
 * The intro page is what the player sees immediately upon starting the game (perhaps add animation to start one day?)
 */

import * as React from 'react';
import { Player } from '../Models/Fighter/Player';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { G_GO_TO_PAGE } from './SharedProps/GoToPageFunc';
import { PageProps } from './SharedProps/PageBaseProps';
import { PageEnum } from './SharedProps/PageEnum';

export default function NewGamePage(props: PageProps) {
    let fighter: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let setPlayerName: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPlayerName);

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
            <h1>Difficulty (TODO)</h1>
            <button onClick={() => {}}>Easy</button>
            <button onClick={() => {}}>Medium</button>
            <button onClick={() => {}}>Hard</button>
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
