import React from 'react';
import Fighter from '../../Models/Fighter/Fighter';
import { Equipment, EquipmentType } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';

function addGodSword(fighter: Fighter) {
    let item = new Equipment(
        'God Sword',
        'A cheat god sword.',
        EquipmentType.WEAPON,
    );
    item.minDamage = 99;
    item.maxDamage = 99;
    item.armor = 99;
    item.health = 99;
    fighter.addItemToInventory(item);
    __GLOBAL_REFRESH_FUNC_REF();
}

export default function Cheat(props: {}): JSX.Element {
    let player: Fighter = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);

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
