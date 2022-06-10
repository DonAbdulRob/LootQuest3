import React from 'react';
import Fighter from '../../Models/Fighter/Fighter';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import CharacterProps from '../SharedProps/CharacterProps';
import './Character.css';

export default function Character(props: CharacterProps): JSX.Element {
    let fighter: Fighter = props.usePlayer
        ? __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player)
        : __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);

    let display;

    if (fighter.name === '') {
        display = (
            <div>
                <p>No enemy yet!</p>
            </div>
        );
    } else {
        display = (
            <div>
                <p className="header-1">{fighter.name}</p>
                <p className="header-2">{'Lvl. ' + fighter.level}</p>
                <p>Gold: {fighter.gold}</p>
                <p>HP: {fighter.getHealthDisplay()}</p>
                <p>DMG: {fighter.getDamageDisplay()}</p>
                <p>ARMOR: {fighter.getArmor()}</p>
            </div>
        );
    }

    return <div className="window-core">{display}</div>;
}
