import React from "react";
import Fighter from "../../Models/Fighter/Fighter";
import { getRandomValueBetween } from "../../Models/Helper";
import CombatProps from "./CombatProps";

function handleAttack(props: CombatProps) {
    var player: Fighter = { ...props.player };
    var enemy: Fighter = { ...props.enemy };

    var playerDamage = getRandomValueBetween(player.minDamage, player.maxDamage);
    var enemyDamage = getRandomValueBetween(enemy.minDamage, enemy.maxDamage);
    
    player.currentHealth -= enemyDamage;
    enemy.currentHealth -= playerDamage;

    props.setPlayer(player);
    props.setEnemy(enemy);
}

export default function Combat(props: CombatProps): JSX.Element {
    let f1 = props.player;
    let f2 = props.enemy;

    return (
        <div>
            <h1>{f1.name} vs. {f2.name}</h1>
            <p>{f1.currentHealth} vs. {f2.currentHealth}</p>
            <button onClick={() => { handleAttack(props); }}>Attack</button>
            <button>Defend (Take 50% Damage)</button>
            <button>Flee</button>
        </div>
    )
}