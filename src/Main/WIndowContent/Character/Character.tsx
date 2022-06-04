import React from "react";
import CharacterProps from "./CharacterProps";

export default function Character(props: CharacterProps): JSX.Element {
    var f = props.fighter;

    return (
        <div>
            <h1>{f.name}</h1>
            <p>The floating window's content</p>
            <p>HP: {f.currentHealth}/{f.maxHealth}</p>
            <p>DMG: {f.minDamage}/{f.maxDamage}</p>
        </div>
    )
}