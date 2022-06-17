import React from 'react';
import { ABILITY_EFFECT_FUNCTION } from '../../Models/Fighter/Ability/AbilityToCoreEffectMapper';
import { GlobalGameStore, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import '../../Components/Popups/ItemPopup.css';
import { Ability } from '../../Models/Fighter/Ability/AbilityList';

export default function AbilityComponent() {
    let store: GlobalGameStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let player = store.player;

    let display = player.abilities.abilityArray.map((v: Ability, i: number) => {
        return (
            <div key={i}>
                <div className="tooltip">
                    <p>{v.name}</p>
                    <span className="tooltiptext">
                        <p className="item-name">{v.name}</p>
                        <p>{v.loreDescription}</p>
                        <p>{v.literalDescription}</p>
                    </span>
                </div>
                <button
                    onClick={() => {
                        let abilityEffectRef = v.effectFunctionReference;

                        ABILITY_EFFECT_FUNCTION(abilityEffectRef)(store);
                    }}
                >
                    Use
                </button>
            </div>
        );
    });

    return (
        <div className="window-core window-flex" style={{ display: 'flex', flexDirection: 'row' }}>
            {display}
        </div>
    );
}
