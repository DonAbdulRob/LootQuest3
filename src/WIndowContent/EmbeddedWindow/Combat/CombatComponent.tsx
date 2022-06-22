import React from 'react';
import EPlayerActivity from '../../../Models/Fighter/EPlayerActivity';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import LootTransitionComponent from './LootTransitionComponent';
import { PlayerAbilityEffectLib } from '../../../Models/Shared/EffectLib/PlayerAbilityEffectLib';

export default function CombatComponent(): JSX.Element {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let player = store.player;
    let enemy = store.enemy;
    let display;

    switch (player.activity) {
        case EPlayerActivity.IN_COMBAT_FIGHTING:
            display = (
                <div>
                    <h1>
                        {player.name} vs. {enemy.name}
                    </h1>
                    <p>{enemy.monsterGenerator.unknownDescription}</p>
                    <p>
                        {player.statBlock.healthMin} vs. {enemy.statBlock.healthMin}
                    </p>
                    <button
                        onClick={() => {
                            store.combatState.processCombatRound(store);
                        }}
                    >
                        Attack
                    </button>
                    <button
                        onClick={() => {
                            // Use 'defense ability'.
                            PlayerAbilityEffectLib.defend(store);
                        }}
                    >
                        Defend
                    </button>
                    <button
                        onClick={() => {
                            PlayerAbilityEffectLib.flee(store);
                        }}
                    >
                        Flee
                    </button>
                </div>
            );
            break;
        case EPlayerActivity.IN_COMBAT_LOOTING:
            display = <LootTransitionComponent />;
            break;
        default:
            display = <div></div>;
    }

    return <div className="combat-window">{display}</div>;
}
