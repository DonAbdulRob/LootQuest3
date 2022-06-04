import React from "react";
import CombatProps from "./CombatProps";

function handleAttack() {
    console.log("a");
}

export default function Combat(props: CombatProps): JSX.Element {
    var f1 = props.fighter1;
    var f2 = props.fighter2;

    return (
        <div>
            <h1>{f1.name} vs. {f2.name}</h1>
            <button onClick={handleAttack}>Attack</button>
            <button>Defend (Take 50% Damage)</button>
            <button>Flee</button>
        </div>
    )
}