import React from "react";
import CharacterProps from "../SharedProps/CharacterProps";
import EquipmentItem from "./EquipmentItem";

export default function Equipment(props: CharacterProps): JSX.Element {
    let f1 = props.fighter;

    return (
        <div>
            <h1>Equipment</h1>
            <EquipmentItem item={f1.equipment.sword} />
        </div>
    )
}