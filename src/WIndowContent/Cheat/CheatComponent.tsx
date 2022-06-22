/**
 * Our cheat component allows developers and testers to make unrestricted game state modifications.
 */
import React from 'react';
import { Equipment, EquipmentType } from '../../Models/Item/Item';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../App';
import { Player } from '../../Models/Fighter/Player';
import { WiseManEncounter } from '../../Story/RandomEncounters/WiseManEncounter';
import { WoodMaterialLib } from '../../Models/Item/Resources/WoodMaterialLib';

function addGodSword(store: IRootStore) {
    let item = new Equipment('God Sword', 'A cheat god sword.', EquipmentType.WEAPON, 50);

    item.statBlock.damageMin = 99;
    item.statBlock.damageMax = 99;
    item.statBlock.health = 99;
    item.statBlock.stamina = 99;
    item.statBlock.mana = 99;
    item.statBlock.armor = 99;

    if (!store.player.inventory.addItem(store.player, item)) {
        store.rpgConsole.addItemFail(item.name);
    }

    __GLOBAL_REFRESH_FUNC_REF();
}

function startWiseManEncounter(store: IRootStore) {
    // Start the wise man encounter.
    store.gameStateManager.wiseManEncounter = new WiseManEncounter(store);
    __GLOBAL_REFRESH_FUNC_REF();
}

function autoPlayOneRound(store: IRootStore) {
    let player: Player = store.player;

    // Create monster if player is idle.
    if (player.isIdle()) {
        store.combatState.startFight(store);
        __GLOBAL_REFRESH_FUNC_REF();
        return;
    }

    while (player.isFighting()) {
        store.combatState.processCombatRound(store);
        __GLOBAL_REFRESH_FUNC_REF();
        return;
    }

    if (player.isLooting()) {
        player.setCombatOver();
        __GLOBAL_REFRESH_FUNC_REF();
        return;
    }
}

function autoPlayTwo(store: IRootStore) {
    for (var i = 0; i < 10000; i++) {
        autoPlayOneRound(store);
    }
}

function autoPlayThree(store: IRootStore) {
    for (var i = 0; i < 1000000; i++) {
        autoPlayOneRound(store);
    }
}

export default function CheatComponent(): JSX.Element {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let player = store.player;

    return (
        <div className="window-core">
            <button
                onClick={() => {
                    addGodSword(store);
                }}
            >
                Add God Sword
            </button>
            <button
                onClick={() => {
                    store.player.inventory.addItem(store.player, WoodMaterialLib.oak);
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Add Oak Log
            </button>
            <button
                onClick={() => {
                    // Demonstrate global item renaming capability, for future items/monsters changing over time.
                    WoodMaterialLib.oak.name = 'Oak Log 2';
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Rename Oak Logs
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
                    player.fullHeal();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Heal
            </button>
            <button
                onClick={() => {
                    autoPlayOneRound(store);
                }}
            >
                Autoplay 1
            </button>
            <button
                onClick={() => {
                    autoPlayTwo(store);
                }}
            >
                Autoplay 10,000
            </button>
            <button
                onClick={() => {
                    autoPlayThree(store);
                }}
            >
                Autoplay 1,000,000
            </button>

            <button
                onClick={() => {
                    startWiseManEncounter(store);
                }}
            >
                Start Wise Man Encounter
            </button>
        </div>
    );
}
