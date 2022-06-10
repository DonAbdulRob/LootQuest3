import React from 'react';
import Fighter from '../../Models/Fighter/Fighter';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import CharacterProps from '../SharedProps/CharacterProps';

export default function Character(props: CharacterProps): JSX.Element {
    let fighter: Fighter = props.usePlayer
        ? __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player)
        : __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);

    return (
        <div>
            <h1>{fighter.name}</h1>
            <p>The floating window's content</p>
            <p>HP: {fighter.getHealthDisplay()}</p>
            <p>DMG: {fighter.getDamageDisplay()}</p>
            <p>ARMOR: {fighter.getArmor()}</p>
        </div>
    );
}
