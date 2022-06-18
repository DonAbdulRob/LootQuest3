import produce from 'immer';
import { StoreSlice } from './StoreSlice';
import { Player } from '../Fighter/Player';

export interface IPlayerSlice {
    player: Player;
    generatePlayer: () => void;
    setPlayerName: (s: string) => void;
}

export const createPlayerSlice: StoreSlice<IPlayerSlice> = (set, get) => ({
    player: new Player(),
    generatePlayer: () =>
        set((prev: IPlayerSlice) => {
            prev.generatePlayer();
            return prev;
        }),

    setPlayerName: (x: string) =>
        set(
            produce((state: any) => {
                state.player.name = x;
            }),
        ),
});

/**
export class Player extends Fighter {
    [immerable] = true;
    abilities: PlayerAbilityContainer = new PlayerAbilityContainer();
    currentArea: Area = G_AREA_GREENVALE;
    activity: PlayerActivity = PlayerActivity.IDLE;

    constructor() {
        super();
        this.generatePlayer();
    }

    generatePlayer = () => {
        this.name = 'Joe';
        this.level = 1;
        this.experience = 0;
        this.gold = 0;
        this.statBlock.healthMin = 10;
        this.statBlock.healthMax = 10;
        this.statBlock.staminaMin = 5;
        this.statBlock.staminaMax = 5;
        this.statBlock.manaMin = 5;
        this.statBlock.manaMax = 5;
        this.statBlock.damageMin = 1;
        this.statBlock.damageMax = 2;
    };

    giveExperience = (enemy: Monster, consoleData: ConsoleData) => {
        // Calculate experience to aware. If the enemy is 4 levels weaker than the player, grant -25% experience per level lower it is.
        let awardExp = enemy.experience;
        let levelDiff = this.level - enemy.level;

        if (levelDiff > 3) {
            awardExp *= 1 - (levelDiff - 2) * 0.25;

            if (awardExp < 0) {
                awardExp = 0;
            }
        }

        let expToLevel = this.getExpToLevel();
        this.experience += awardExp;

        if (this.experience >= expToLevel) {
            this.experience -= expToLevel;
            this.level += 1;

            // Increase resources.
            this.statBlock.healthMax += 2;
            this.statBlock.manaMax += 1;
            this.statBlock.staminaMax += 1;

            // Heal.
            this.fullHeal();

            // Every 2 levels gain 1 armor and +1/1 damage. (Start at level 1, so check at 3, 5, 7, etc.).
            if (this.level % 3 === 0 || (this.level > 3 && this.level % 2 === 1)) {
                this.statBlock.armor += 1;
                this.statBlock.damageMin += 1;
                this.statBlock.damageMax += 1;
            }

            consoleData.add('You have leveled up to ' + this.level + '!');
            __GLOBAL_REFRESH_FUNC_REF();
        }
    };

    /**
     * Activity related section.
    setCombatStart = () => {
        this.activity = PlayerActivity.IN_COMBAT_FIGHTING;
    };

    setLooting = () => {
        this.activity = PlayerActivity.IN_COMBAT_LOOTING;
    };

    setCombatOver = () => {
        this.activity = PlayerActivity.IDLE;
    };

    isFighting = () => {
        return this.activity === PlayerActivity.IN_COMBAT_FIGHTING;
    };

    inCombat = () => {
        return (
            this.activity === PlayerActivity.IN_COMBAT_FIGHTING || this.activity === PlayerActivity.IN_COMBAT_LOOTING
        );
    };
}
*/
