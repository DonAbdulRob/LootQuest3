/**
 * Our cheat component allows developers and testers to make unrestricted game state modifications.
 */
import React from 'react';
import { Equipment, EquipmentType } from '../../Models/Item/Item';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../App';
import { Monster } from '../../Models/Fighter/Monster';
import { Player } from '../../Models/Fighter/Player';
import GameStateManager from '../../Models/Singles/GameStateManager';
import { RpgConsole } from '../../Models/Singles/RpgConsole';
import { getRandomValueBetween } from '../../Models/Helper';
import { WiseManEncounter } from '../../Story/RandomEncounters/WiseManEncounter';

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
    let enemy: Monster = store.enemy;
    let rpgConsole: RpgConsole = store.rpgConsole;
    let gameStateManager: GameStateManager = store.gameStateManager;

    // Create monster if player is idle.
    if (player.isIdle()) {
        let monsterLevel = getRandomValueBetween(player.currentArea.levelMin, player.currentArea.levelMax);
        enemy.generateMonster(monsterLevel, gameStateManager.gameDifficulty);
        rpgConsole.add('A monster appears: ' + enemy.name);
        player.setCombatStart();
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
