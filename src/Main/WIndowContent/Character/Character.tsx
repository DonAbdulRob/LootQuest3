import React from "react";
import CharacterProps from "../SharedProps/CharacterProps";

export default function Character(props: CharacterProps): JSX.Element {
    let fighter = props.fighter;

    return (
        <div>
            <h1>{fighter.name}</h1>
            <p>The floating window's content</p>
            <p>HP: {fighter.statBlock.healthMin}/{fighter.statBlock.healthMax}</p>
            <p>DMG: {fighter.getDamageDisplay()}</p>
            <p>ARMOR: {fighter.getArmor()}</p>
        </div>
    )
}