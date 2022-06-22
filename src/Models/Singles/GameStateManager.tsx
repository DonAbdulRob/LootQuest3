/**
 * A class to hold various global game state values.
 * Theme, difficulty, what player is doing outside of combat, etc. All of that will be held here.
 */

import React from 'react';
import { AbstractEncounter } from '../../Story/AbstractEncounter';
import { WiseManEncounter } from '../../Story/RandomEncounters/WiseManEncounter';
import AreaContainer from '../Area/AreaContainer';
import { GameDifficulty } from './GameDifficulty';

export default class GameStateManager {
    gameDifficulty: GameDifficulty = new GameDifficulty();
    areaContainer: AreaContainer = new AreaContainer();
    exploreOutput: string = '';

    /**
     * Hold instance of all encounters and their states for reference at any time.
     * We do want encounters to be speciifc to any active running game, rather than an individual plaeyr, so that if we ever hypothetically add multiplayer,
     * all players have a synchronized state for encounters.
     */
    wiseManEncounter: WiseManEncounter | null = null;

    getAnyActiveEncounters(): JSX.Element | null {
        if (this.isOngoing(this.wiseManEncounter)) {
            return this.getContent(this.wiseManEncounter as AbstractEncounter);
        }
        return null;
    }

    getContentIfOngoing(encounter: AbstractEncounter) {
        return this.isOngoing(encounter) ? this.getContent(encounter) : null;
    }

    getContent(encounter: AbstractEncounter) {
        return (
            <div>
                {encounter.introLines.map((v, i) => (
                    <p className="encounter-line" key={i}>
                        {v}
                    </p>
                ))}
                <p className="encounter-line">{encounter.nextPrompt.body}</p>
                <br />
                {encounter.nextPrompt.responses.map((v, i) => (
                    <span key={i}>{v}</span>
                ))}
            </div>
        );
    }

    isOngoing(encounter: AbstractEncounter | null) {
        if (encounter !== null && !encounter.isOver) {
            return true;
        }

        return false;
    }
}
