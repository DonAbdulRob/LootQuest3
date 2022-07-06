/**
 * The Help Page provides the user with information on how to play the game.
 */

import * as React from 'react';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import { PageContainer } from './Enums/PageContainer';

export default function HelpPage() {
    let setPage: Function = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.setPage);

    return (
        <div id="HelpPage" className="container">
            <h1>Help</h1>
            <br />
            <p>This page is designed to help you, the reader, play the game to the best of your ability.</p>
            <hr />
            <h1>About Loot Quest</h1>
            <p>
                Loot Quest is a turn-based roleplaying game that lets you fight monsters for experience, loot and, most
                importantly, fun! The game can be played however one likes. Though, the over-arching plot is to become
                the strongest being in existance.
            </p>
            <hr />
            <h1>Before You Play</h1>
            <p>
                I strongly recommend that you modify your game window's zoom if you intend to seriously play the game.
                The default setting is quite large for aethestics and can and really should be shrunk down for
                efficiency if you're serious about playing the game for a while. 80% is probably good enough for most,
                but if you have a 4k monitor that's fairly large, your settings might vary quite a bit from average.
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
            {/*
                Feature in progress.s
                <p>
                    Once you've killed OR fled from 5 monsters in the area, the next area will unlock for you to explore.
                    And, you can then choose to stay in the Forest Outskirts, travel to the next location, or return back to
                    the city.
                </p>
            */}
            <hr />
            <h1>The Travel System</h1>
            <p>
                Loot Quest utilizes a virtual map system where areas, visible within the Area Window, lead backwards and
                forwards to one or more areas. Advancing to a new area requires moving to a connected area. Though, you
                may instantly travel to areas at a much lower level than yourself.
                {/* Add comment about 5 kills / being in much lower level to use global travel later when implemented */}
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
            <h1>Tips</h1>
            <p>
                Windows can be dragged and dropped using the 'hook' button on each window. You can reset closed windows
                using the 'Reset Windows' setting. And, themes can be changed and customized from there too. Theme
                import/export is a WIP feature for the future. For now, it is recommended to use the default red/blue
                themes.
            </p>
            <hr />
            <button
                onClick={() => {
                    setPage(PageContainer.Play);
                }}
            >
                Back
            </button>
        </div>
    );
}
