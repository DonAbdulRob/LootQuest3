import React from "react";
import Fighter from "../../Models/Fighter/Fighter";
import { CombatStateEnum } from "../../Models/Shared/CombatState";
import { refreshRef as __GLOBAL_REFRESH_FUNC_REF } from "../../Pages/PlayPage";
import { ConsoleData } from "../Console/Console";
import CombatProps from "./CombatProps";

function handleAttack(props: CombatProps, combatLog: ConsoleData, setCombatLog: Function) {
    let player: Fighter = { ...props.player};
    let enemy: Fighter = { ...props.enemy};

    let playerArmor = player.statBlock.armor;
    let enemyArmor = enemy.statBlock.armor;

    let playerDamage = player.getDamage() - enemyArmor;
    let enemyDamage = enemy.getDamage() - playerArmor
    player.statBlock.healthMin -= enemyDamage;
    enemy.statBlock.healthMin -= playerDamage;

    combatLog.add("Player hit for " + playerDamage);
    combatLog.add("Enemy hit for " + enemyDamage);

    if (player.statBlock.healthMin <= 0) {
        combatLog.add("You died, but a passing Cleric revived you at full life. (Nice!)");
        player.statBlock.healthMin = player.statBlock.healthMax;

        props.combatState.advance();
        props.setCombatState(props.combatState);
    }

    if (enemy.statBlock.healthMin <= 0) {
        combatLog.add("Enemy died.");
        enemy.reset();

        props.combatState.advance();
        props.setCombatState(props.combatState);
    }

    props.setPlayer(player);
    props.setEnemy(enemy);
    setCombatLog(combatLog);
}

export default function Combat(props: CombatProps): JSX.Element {
    let f1 = props.player;
    let f2 = props.enemy;
    let combatState = props.combatState;
    let display;
    let [combatLog, setCombatLog] = [props.combatLog, props.setCombatLog];

    switch (combatState.combatState) {
        case CombatStateEnum.OUT_OF_COMBAT:
            display = <div>
                <p>No enemy yet!</p>
            </div>
            break;
        case CombatStateEnum.IN_COMBAT:
            display = <div>
                <h1>{f1.name} vs. {f2.name}</h1>
                <p>{f1.statBlock.healthMin} vs. {f2.statBlock.healthMin}</p>
                <button onClick={() => { handleAttack(props, combatLog, setCombatLog); }}>Attack</button>
                <button>Defend (Take 50% Damage)</button>
                <button>Flee</button>
            </div>;
            break;
        case CombatStateEnum.LOOTING:
            display = <div>
                <h1>Loot!</h1>
                <p>Item List: TODO</p>
                <button onClick={() => {
                    props.combatState.advance();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}>End Looting</button>
            </div>;
            break;
        default:
            display = <div></div>;
    }

    return display;
}