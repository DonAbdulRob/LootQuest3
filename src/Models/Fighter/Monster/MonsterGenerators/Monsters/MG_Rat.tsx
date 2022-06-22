/* eslint-disable no-fallthrough */
import { MonsterGenerator } from '../../MonsterGenerator';

/**
 * Rats are relatively weak monsters.
 * The weaker rats will always have their names known while stronger variants won't.
 */
export class MG_Rat extends MonsterGenerator {
    setProperties() {
        // Our stat formula for infinite monster growth.
        var statAssignmentFormula = () => {
            this.statBlock.healthMin = this.getLevelScaledStat_HEALTH(4);
            this.statBlock.healthMax = this.getLevelScaledStat_HEALTH(4);
            this.statBlock.damageMin = this.getLevelScaledStat_MEDIUM(1);
            this.statBlock.damageMax = this.getLevelScaledStat_MEDIUM(1);
        };

        // Set monster attributes based on level.
        if (this.level === 1) {
            // Rats always have their names known.
            this.setNames('Adorable Mouse');
            this.setDescriptions(
                `A brown-furred, tiny and adorable mouse approaches you. It's small, black and beady eyes sparkle as it rises on its hind legs. ` +
                    `'Feed me! Play with me! Cuddle me!' is what its face reads. How cute!`,
            );
            this.statBlock.healthMin = 5;
            this.statBlock.healthMax = 5;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 2;
        } else if (this.level === 2) {
            this.setNames('Small Rat');
            this.setDescriptions(
                `A brown-furred, small rat approaches you. Its long tail swishes back and forth as it darts aggressively from side to side.`,
            );
            this.statBlock.healthMin = 9;
            this.statBlock.healthMax = 9;
            this.statBlock.damageMin = 2;
            this.statBlock.damageMax = 3;
        } else if (this.level === 3) {
            this.setNames('Rat');
            this.setDescriptions(
                `A medium sized rat appears before you with a slender, black-furred body and thick tail. It's clearly hungry and eyes its next meal with obvious desire.`,
            );
            this.statBlock.healthMin = 18;
            this.statBlock.healthMax = 18;
            this.statBlock.damageMin = 3;
            this.statBlock.damageMax = 5;
        } else if (this.level === 4) {
            this.setNames('Big Rat');
            this.setDescriptions(
                `A big rat that has clearly eaten and lived well. Even though its the slowest rat you've met, you feel that its strength is quite the opposite.`,
            );
            this.statBlock.healthMin = 30;
            this.statBlock.healthMax = 30;
            this.statBlock.damageMin = 5;
            this.statBlock.damageMax = 7;
        } else if (this.level <= 7) {
            this.unknownName = 'Mysterious Rat';
            this.knownName = 'Rat Lord';
            this.knownDescription =
                'A Rat Lord appears before you! Standing on its hind legs at 3 feet tall, you dare not underestimate it.';
            statAssignmentFormula();
        } else if (this.level <= 10) {
            this.unknownName = 'Mysterious Rat';
            this.knownName = 'Rat King';
            this.knownDescription =
                `You encounter a Rat King! This fearsom creature stands at four feet tall with a golden crown on its head and a tattered red cape on its back. ` +
                `It stares at you with silent intelligence, plotting its next move.`;
            statAssignmentFormula();
        } else if (this.level <= 15) {
            this.unknownName = 'Mysterious Rat';
            this.knownName = 'Rat Overlord';
            this.knownDescription =
                `Oh no! It's a Rat Overlord! As an overlord, it is a King of Kings, capable of causing even Rat Kings to scramble in fear. ` +
                `It looks at you not as a feasome opponent, but rather as prey.`;
            statAssignmentFormula();
        } else {
            this.unknownName = 'Powerful Rat';
            this.unknownDescription =
                'You feel a chill run down your spine. Upon turning to look, you spot a rat that glows with faint black light.';
            this.knownName = 'Rat Proginator';
            this.knownDescription =
                `Before you see anything a chill runs down your spine. You turn to look and spot what is known to be the oldest, ` +
                `most powerful and most wise of rats. A Proginator! Bathed in black light with glowing red eyes, your first instinct is to flee.`;
            statAssignmentFormula();
        }

        if (this.level > 4) {
            this.unknownDescription = `A new type of rat appears before you with unknown strength. All you can tell is that it's strong.`;
        }
    }
}
