/**
 * This file defines the data for monsters, the main entity that players will fight against.
 */
import { G_getRandomValueUpTo } from '../../Helper';
import { GameDifficulty } from '../../Singles/GameDifficulty';
import { MonsterAbilityContainer } from '../Ability/MonsterAbilityContainer';
import Fighter from '../Fighter';
import { MonsterGenerator } from './MonsterGenerator';
import { MG_NULL } from './MonsterGenerators/Monsters/MG_NULL';
import { MG_Rat } from './MonsterGenerators/Monsters/MG_Rat';
import { MG_Wolf } from './MonsterGenerators/Monsters/MG_Wolf';

export class Monster extends Fighter {
    areaLevel: number = 0;
    abilities: MonsterAbilityContainer = new MonsterAbilityContainer();
    monsterGenerator: MonsterGenerator = new MG_NULL(this.statBlock, -1, new GameDifficulty()); // will always be overwriten on monster gen.

    generateMonsterSpecific = (monsterGenerator: MonsterGenerator) => {
        // Always reset and set level first in this order.
        this.monsterGenerator = monsterGenerator;

        // Generate the remaining monster properties.
        this.level = monsterGenerator.level;
        this.experience = 2;
        this.gold = this.level * 2;
        this.name = monsterGenerator.unknownName;
        this.statBlock = monsterGenerator.statBlock;
        this.abilities = new MonsterAbilityContainer();
    };

    generateMonsterRandom = (baseLevel: number, gameDifficulty: GameDifficulty) => {
        this.reset();
        this.areaLevel = baseLevel;

        // Determine monster type randomly, then generate remaining data based on type.
        switch (G_getRandomValueUpTo(1)) {
            case 0:
                this.generateMonsterSpecific(new MG_Rat({ ...this.statBlock }, baseLevel, gameDifficulty));
                break;
            case 1:
                this.generateMonsterSpecific(new MG_Wolf({ ...this.statBlock }, baseLevel, gameDifficulty));
                break;
        }
    };
}
