import { __GLOBAL_REFRESH_FUNC_REF } from '../../App';
import { RpgConsole } from '../Singles/RpgConsole';
import { IMonsterEffectFunction } from '../Fighter/Ability/MonsterAbilityContainer';
import { IRootStore } from '../GlobalGameStore';
import { getRandomElement, getRandomValueUpTo } from '../Helper';
import { Item } from '../Item/Item';
import { ItemGen } from '../Item/ItemGen';
import { ICustomDamageMessage } from './ICustomDamageMessage';

export default class CombatState {
    round: number = 0;
    loot: Array<Item> = [];
    generateLootLock: boolean = false;

    generateNewLoot() {
        this.loot = [];
        let lootRolls = getRandomValueUpTo(100);
        let lootAmount = 0;

        if (lootRolls >= 50) {
            lootAmount = 1;
        } else if (lootRolls >= 75) {
            lootRolls = 2;
        } else if (lootRolls >= 90) {
            lootRolls = 3;
        }

        let type;

        for (var i = 0; i < lootAmount; i++) {
            type = getRandomValueUpTo(1);

            if (type === 0) {
                this.loot.push(ItemGen.getRandomSword());
            } else if (type === 1) {
                this.loot.push(ItemGen.getOranHerb());
            }
        }
    }

    private getCustomDamageMessage(customDamageMessage: ICustomDamageMessage, damage: number) {
        return customDamageMessage.str1 + damage + customDamageMessage.str2;
    }

    private displayBasicAttackMessage(damage: number, rpgConsole: RpgConsole) {
        rpgConsole.add('You perform a basic attack for ' + damage + ' damage.');
    }

    private displayMessage(damage: number, rpgConsole: RpgConsole, customMessage: ICustomDamageMessage) {
        let finalMsg = '';

        if (customMessage.insertDamage) {
            finalMsg = this.getCustomDamageMessage(customMessage, damage);
        } else {
            finalMsg = customMessage.str1;
        }

        rpgConsole.add(finalMsg);
    }

    processCombatRound(store: IRootStore, customMessage?: ICustomDamageMessage | null) {
        let player = store.player;
        let enemy = store.enemy;
        let rpgConsole = store.rpgConsole;
        let combatState = store.combatState;

        // var init
        let playerDead = false;
        let enemyDead = false;
        let playerArmor = player.getArmor();
        let enemyArmor = enemy.getArmor();

        /**
         * Damage Calcs
         */

        let playerDamage = player.getRandomDamageValue() - enemyArmor;
        let enemyDamage = enemy.getRandomDamageValue() - playerArmor;

        // Cap damage to 0 minimum.
        if (playerDamage < 0) {
            playerDamage = 0;
        }

        if (enemyDamage < 0) {
            enemyDamage = 0;
        }

        /**
         * Execute Player attack.
         */

        // If player has skip turn status, skip over damage portion entirely.
        if (!player.statusContainer.hasSkipTurnStatus()) {
            enemy.statBlock.healthMin -= playerDamage;
            this.displayBasicAttackMessage(playerDamage, rpgConsole);
        } else {
            if (customMessage !== undefined && customMessage !== null) {
                this.displayMessage(playerDamage, rpgConsole, customMessage);
            } else {
                console.warn(
                    `Warning: No description for the combat turn provided. This is not necessarily an error and may be intentional, assuming a message is expected then provided or isn't expected then isn't provided.`,
                );
            }
        }

        // If enemy died, then handle enemy death.
        if (enemy.statBlock.healthMin <= 0) {
            enemyDead = true;
            rpgConsole.add('Enemy died.');
            player.gold += enemy.gold;
            player.giveExperience(store);
            player.setLooting();

            // Generate loot.
            combatState.generateNewLoot();

            // End combat if no loot, else show loot screen.
            if (combatState.loot.length === 0) {
                player.setCombatOver();
            } else {
                player.setLooting();
            }
        }

        // If the enemy isn't dead, handle monster attack.
        if (!enemyDead) {
            // If there are any abilities, roll 25% chance to use it.
            let enemyAbilities: Array<IMonsterEffectFunction> = enemy.abilities.abilityArray;
            let usedAbility = false;

            if (enemyAbilities.length > 0) {
                let abilityUseChance = getRandomValueUpTo(4); // 20% chance.

                if (abilityUseChance === 0) {
                    usedAbility = true;
                    let doAbility: IMonsterEffectFunction = getRandomElement(enemyAbilities);

                    // Do the ability.
                    doAbility(enemy, player, combatState, rpgConsole);
                }
            }

            // Otherwise, do basic attack.
            if (!usedAbility) {
                player.statBlock.healthMin -= enemyDamage;
                rpgConsole.add(enemy.name + ' hits you for ' + enemyDamage + ' damage.');
            }
        }

        // If Player died, handle player death.
        if (player.statBlock.healthMin <= 0) {
            playerDead = true;

            rpgConsole.add('You died, but a passing Cleric revived you at full life. (Nice!)');

            // Heal and clear statuses.
            player.statBlock.healthMin = player.statBlock.healthMax;
            player.statusContainer.clear();

            // Reset combat state.
            player.setCombatOver();
        }

        // Process status effects.
        if (!playerDead) {
            player.statusContainer.reduceStatusTurns();
        }

        if (!enemyDead) {
            enemy.statusContainer.reduceStatusTurns();
        }

        // Refresh!
        __GLOBAL_REFRESH_FUNC_REF();
    }
}
