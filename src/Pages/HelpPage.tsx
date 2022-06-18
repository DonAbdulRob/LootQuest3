/**
 * The intro page is what the player sees immediately upon starting the game (perhaps add animation to start one day?)
 */

import * as React from 'react';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import IPageEnum from './Enums/IPageEnum';

export default function HelpPage() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <div id="HelpPage" className="container">
            <h1>Help Page</h1>
            <h2>Please note that some of the features described in this document a Work in Progress.</h2>
            <p>
                Welcome to the Help Page for Loot Quest! This page is designed to help break down a lot of features
                about the game so that you can understand how to best enjoy the game.
            </p>
            <hr />
            <h1>About Loot Quest</h1>
            <p>
                Loot Quest is a turn-based roleplaying game that lets you fight monsters for experience, loot and, most
                importantly, fun! The game can be played however one likes. Though, the over-arching plot is to become
                the strongest being in existance.
            </p>
            <hr />
            <h1>How to Play?</h1>
            <p>
                The game can be played by hitting the 'New Game' button from the Main Menu, choosing a name and
                difficulty, or using the defaults, then pressing 'Begin'. This puts you onto the main play screen, where
                you can engage with all of the game's various features in the various different interfaces visible to
                you.
            </p>
            <p>
                By default, you start within Greenvale, a friendly town where you can rest at the inn and take advantage
                of other features. Once you're ready to leave, you can use the Area Selection window to go to the
                Greevale Border area next and begin to fight monsters for loot, experience and items.
            </p>
            <p>
                Once you've killed OR fled from 5 monsters in the area, the next area will unlock for you to explore.
                And, you can then choose to stay in the Forest Outskirts, travel to the next location, or return back to
                the city.
            </p>
            <hr />
            <h1>The Travel System</h1>
            <p>
                Loot Quest utilizes a virtual map system where areas, visible within the Area Window, lead backwards and
                forwards to one or more areas. Advancing to a new area requires killing or fleeing from 5 monsters. And,
                if you are in an area five levels or lower than yourself, you may move to any area five levels or lower
                than yourself.
            </p>
            <hr />
            <h1>Combat</h1>
            <p>
                Loot Quest is a turn-based game, meaning that you take your turn and then the enemy takes theirs. Use
                options on the combat screen to manage encounters. And, feel free to make use of abilities within the
                Ability window to have an edge over foes. Being reduced to zero health or lower means death. And, as an
                additional note, monsters substantially weaker than you will award reduced experience.
            </p>
            <hr />
            <button
                onClick={() => {
                    setPage(IPageEnum.Play);
                }}
            >
                Back
            </button>
        </div>
    );
}
