import React from 'react';
import Area from '../../../Models/Area/Area';
import { Player } from '../../../Models/Fighter/Player';
import { __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import GameStateManager from '../../../Models/Singles/GameStateManager';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import './AreaComponent.css';

export default function AreaComponent() {
    let gameStateManager: GameStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.gameStateManager);
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);

    return (
        <div className="area-parent-container">
            <h1>{player.currentArea.name}</h1>
            <h2>{player.currentArea.getLevelDisplay()}</h2>
            <p>Travel To:</p>
            <div className="area-container">
                {gameStateManager.areaContainer.getAreaList(player).map((v: Area) => {
                    return (
                        <span className="area-item">
                            {v.name}
                            <br />
                            {v.getLevelDisplay()}
                            <button
                                onClick={() => {
                                    player.currentArea = v;
                                    __GLOBAL_REFRESH_FUNC_REF();
                                }}
                            >
                                GO
                            </button>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
