import React from 'react';
import { ABILITY_EFFECT_FUNCTION } from '../../Models/Fighter/Ability/AbilityToCoreEffectMapper';
import { Player } from '../../Models/Fighter/Player';
import { Monster } from '../../Models/Fighter/Monster';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import '../../Components/Popups/ItemPopup.css';
import { Ability } from '../../Models/Fighter/Ability/AbilityList';

export default function Abilities() {
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let enemy: Monster = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);
    let combatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let consoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);

    let display = player.abilities.abilityArray.map((v: Ability, i: number) => {
        return (
            <div>
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

                        ABILITY_EFFECT_FUNCTION(abilityEffectRef)(player, enemy, combatState, consoleData);
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
