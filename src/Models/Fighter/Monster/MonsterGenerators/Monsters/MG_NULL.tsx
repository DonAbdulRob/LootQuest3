/* eslint-disable no-fallthrough */
import { MonsterGenerator } from '../../MonsterGenerator';

/**
 * Rats are relatively weak monsters.
 * The weaker rats will always have their names known while stronger variants won't.
 */
export class MG_NULL extends MonsterGenerator {
    setProperties() {
        this.setNames('Null Monster');
        this.setDescriptions(`A null monster that has not been seen before.`);
        this.statBlock.healthMin = 1;
        this.statBlock.healthMax = 1;
        this.statBlock.damageMin = 1;
        this.statBlock.damageMax = 1;
    }
}
