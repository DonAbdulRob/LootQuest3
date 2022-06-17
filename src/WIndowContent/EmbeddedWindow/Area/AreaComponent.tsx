import React from 'react';
import Area from '../../../Models/Area/Area';
import { GlobalGameStore, __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import './AreaComponent.css';

export default function AreaComponent() {
    let store: GlobalGameStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let player = store.player;

    return (
        <div className="area-parent-container">
            <h1>{player.currentArea.name}</h1>
            <h2>{player.currentArea.getLevelDisplay()}</h2>
            <p>Travel To:</p>
            <div className="area-container">
                {store.gameStateManager.areaContainer.getAreaList(player).map((v: Area, i: number) => {
                    return (
                        <span className="area-item" key={i}>
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
