/**
 * A class to hold various global game state values.
 * Theme, difficulty, what player is doing outside of combat, etc. All of that will be held here.
 */

import { GameDifficulty } from './GameDifficulty';

export default class GameStateManager {
    gameDifficulty: GameDifficulty = new GameDifficulty();
}
