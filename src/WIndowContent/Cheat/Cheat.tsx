import React from 'react';
import Fighter from '../../Models/Fighter/Fighter';
import { Item, ItemType } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';

function addGodSword(fighter: Fighter) {
    fighter.addItemToInventory(
        new Item(
            'God Sword',
            'A cheat god sword.',
            ItemType.WEAPON,
            99,
            99,
            99,
            99,
        ),
    );
    __GLOBAL_REFRESH_FUNC_REF();
}

export default function Cheat(props: {}): JSX.Element {
    let player: Fighter = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let enemy: Fighter = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);
    let combatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let consoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);
    let display;

    return (
        <div className="window-core">
            <button
                onClick={() => {
                    addGodSword(player);
                }}
            >
                Add God Sword
            </button>
            <button
                onClick={() => {
                    player.gold = 999999;
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Set Gold High
            </button>
        </div>
    );
}
