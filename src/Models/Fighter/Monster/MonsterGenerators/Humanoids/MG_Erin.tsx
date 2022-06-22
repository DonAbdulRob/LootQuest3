/* eslint-disable no-fallthrough */
import { MonsterGenerator } from '../../MonsterGenerator';

/**
 * Represents the 'Monster Generator' for the Rat monster base type.
 */
export class MG_Erin extends MonsterGenerator {
    static isKnown = false;
    static knownName = 'Mage Erin';

    setProperties() {
        this.unknownName = 'Unknown Mage';
        this.unknownDescription =
            "You have no idea who this Mage is, but you attacked him, so it's combat time! Let's hope he's weak!";
        this.knownName = MG_Erin.knownName;
        this.knownDescription =
            'Mage Erin wears bright blue robes and appears both old and sturdy. As he begins to whisper a chant, you make your first move.';

        // Set fixed stats.
        this.level = 5;
        this.statBlock.healthMin = 100;
        this.statBlock.healthMax = 100;
        this.statBlock.damageMin = 10;
        this.statBlock.damageMax = 25;
    }
}
