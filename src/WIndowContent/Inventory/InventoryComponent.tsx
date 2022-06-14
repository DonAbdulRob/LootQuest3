import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import { Item, EquipmentType, ItemType, Equipment, Consumable } from '../../Models/Item/Item';
import { CONSUMABLE_EFFECT_FUNCTION } from '../../Models/Item/ItemEffectToCoreEffectMapper';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import { ConsoleData } from '../Console/ConsoleComponent';
import { EquipmentSlotMapping } from '../../Models/Fighter/Storage/EquipmentSlots';
import { Player } from '../../Models/Fighter/Player';
import { Monster } from '../../Models/Fighter/Monster';
import CombatState from '../../Models/Shared/CombatState';
import GameStateManager from '../../Models/Singles/GameStateManager';

function equip(fighter: Player, inventorySlot: number) {
    let invItem: Equipment | Item = fighter.inventory.items[inventorySlot];

    if (!(invItem instanceof Equipment)) {
        console.log('Dev error. Trying to equip non-equip: ' + invItem.name);
        return;
    }

    let invItemType: EquipmentType = invItem.equipmentType;
    let equipItem: Item | null = null;

    switch (invItemType) {
        case EquipmentType.WEAPON:
            equipItem = fighter.equipmentSlots.items[EquipmentSlotMapping.weapon];
            break;
        case EquipmentType.CHESTPLATE:
            equipItem = fighter.equipmentSlots.items[EquipmentSlotMapping.chestplate];
            break;
        default:
            break;
    }

    // If there is an item, move equipment to inventory
    if (equipItem !== null) {
        fighter.inventory.items.push(equipItem);
    }

    // Move inventory item to our equipment slots.
    switch (invItemType) {
        case EquipmentType.WEAPON:
            fighter.equipmentSlots.items[EquipmentSlotMapping.weapon] = invItem;
            break;
        case EquipmentType.CHESTPLATE:
            fighter.equipmentSlots.items[EquipmentSlotMapping.chestplate] = invItem;
            break;
        default:
            break;
    }

    // Remove inventory item from inventory.
    fighter.inventory.items.splice(inventorySlot, 1);
    __GLOBAL_REFRESH_FUNC_REF();
}

function drop(fighter: Player, inventorySlot: number) {
    fighter.inventory.items.splice(inventorySlot, 1);
    __GLOBAL_REFRESH_FUNC_REF();
}

function getInventoryMap(
    fighter: Player,
    enemy: Monster,
    combatState: CombatState,
    gameStateManager: GameStateManager,
    consoleData: ConsoleData,
): JSX.Element[] {
    if (fighter.inventory.items.length === 0) {
        return [<div key={0}></div>];
    }

    return fighter.inventory.items.map((v, i) => {
        let useButton = null;
        let equipButton = null;

        if (v.itemType === ItemType.CONSUMABLE) {
            useButton = (
                <button
                    onClick={() => {
                        let func = CONSUMABLE_EFFECT_FUNCTION((v as Consumable).useFunctionId);

                        if (func != null) {
                            func(fighter, enemy, i, combatState, gameStateManager, consoleData);
                            __GLOBAL_REFRESH_FUNC_REF();
                        }
                    }}
                >
                    Use
                </button>
            );
        }

        if (v.itemType === ItemType.EQUIPMENT) {
            equipButton = (
                <button
                    onClick={() => {
                        equip(fighter, i);
                    }}
                >
                    Equip
                </button>
            );
        }

        return (
            <div key={i}>
                <ItemPopup prefix="" item={fighter.inventory.items[i]} addLootButton={false} />
                {useButton}
                {equipButton}
                <button
                    onClick={() => {
                        drop(fighter, i);
                    }}
                >
                    Drop
                </button>
            </div>
        );
    });
}

/**
 * Show player inventory. Doesn't support the 'fighter' class objects. Only players.
 */
export default function InventoryComponent(): JSX.Element {
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let enemy: Monster = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);
    let combatState: CombatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let consoleData: ConsoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);
    let gameStateManager: GameStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.gameStateManager);

    return (
        <div className="window-core">
            <h1>Inventory</h1>
            {getInventoryMap(player, enemy, combatState, gameStateManager, consoleData)}
        </div>
    );
}
