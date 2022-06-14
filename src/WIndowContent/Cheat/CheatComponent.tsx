import React from 'react';
import { Equipment, EquipmentType } from '../../Models/Item/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import { Player } from '../../Models/Fighter/Player';

function addGodSword(fighter: Player) {
    let item = new Equipment('God Sword', 'A cheat god sword.', EquipmentType.WEAPON);

    item.statBlock.damageMin = 99;
    item.statBlock.damageMax = 99;
    item.statBlock.health = 99;
    item.statBlock.stamina = 99;
    item.statBlock.mana = 99;
    item.statBlock.armor = 99;

    fighter.addItemToInventory(item);
    __GLOBAL_REFRESH_FUNC_REF();
}

export default function CheatComponent(props: {}): JSX.Element {
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);

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
            <button
                onClick={() => {
                    player.statBlock.healthMin = player.getHealthMax();
                    player.statBlock.manaMin = player.getManaMax();
                    player.statBlock.staminaMin = player.getStaminaMax();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Heal
            </button>
        </div>
    );
}
