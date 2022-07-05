/* eslint-disable no-fallthrough */
import { MonsterGenerator } from '../../MonsterGenerator';

export class MG_Bandit extends MonsterGenerator {
    setProperties() {
        // Our stat formula for infinite monster growth.
        const statAssignmentFormula = () => {
            this.statBlock.healthMin = this.getLevelScaledStat_HEALTH(4);
            this.statBlock.healthMax = this.getLevelScaledStat_HEALTH(4);
            this.statBlock.damageMin = this.getLevelScaledStat_MEDIUM(1);
            this.statBlock.damageMax = this.getLevelScaledStat_MEDIUM(1);
        };

        // Set monster attributes based on level.
        if (this.level === 1) {
            this.setNames('Bandit Child');
            this.setDescriptions(
                `A bandit child that is only five or six years at best. Holding a small wooden sword and wearing a brown bandana, he looks at you fiercely. You can't help but to feel sorry for him.`,
            );
            this.statBlock.healthMin = 5;
            this.statBlock.healthMax = 5;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 2;
        } else if (this.level === 2) {
            this.setNames('Bandit Initiate');
            this.setDescriptions(
                `A person that recently decided to join the bandits for a better life. How unfortunate that you're his first encounter...`,
            );
            this.statBlock.healthMin = 8;
            this.statBlock.healthMax = 8;
            this.statBlock.damageMin = 2;
            this.statBlock.damageMax = 4;
        } else if (this.level === 3) {
            this.setNames('Bandit');
            this.setDescriptions(
                `A skilled and trained bandit ready to kill you and loot your corpse. Wielding a single knife, leather armor, a black mask and a black bandana with slits over his eyes, he stands in a crouched position ready to fight.`,
            );
            this.statBlock.healthMin = 15;
            this.statBlock.healthMax = 15;
            this.statBlock.damageMin = 4;
            this.statBlock.damageMax = 6;
        } else if (this.level === 4) {
            this.setNames('Elite Bandit');
            this.setDescriptions(
                `A bandit with large muscles, thick leather gear and confident bearing. If not for his obviously rouge-theemd gear, you might confuse him for a warrior or knight.`,
            );
            this.statBlock.healthMin = 24;
            this.statBlock.healthMax = 24;
            this.statBlock.damageMin = 7;
            this.statBlock.damageMax = 9;
        } else if (this.level <= 7) {
            this.unknownName = 'Mysterious Wolf';
            this.knownName = 'Bandit Leader';
            this.knownDescription =
                'Ahead of you is a Bandit Leader whom has plundered for years and years. His cold gaze oozes intelligence and danger as he calculates his next move.';
            statAssignmentFormula();
        } else if (this.level <= 10) {
            this.unknownName = 'Mysterious Bandit';
            this.knownName = 'Bandit King';
            this.knownDescription =
                `Bandit Kings are bandits that have become some successful and powerful that they can rival lawfully elected kings. The only difference between ` +
                ` the two is that Bandit Kings rise to power through strength rather than charisma. Wearing a solid gold crown, various thick animal pelts and a dark-red cape, the Bandit King ` +
                ` doesnt' bother to ignore you.`;
            statAssignmentFormula();
        } else if (this.level <= 15) {
            this.unknownName = 'Mysterious Bandit';
            this.knownName = 'Bandit Overlord';
            this.knownDescription =
                `Oh no! A Bandit Overlord! Such beings are known as the invisible hands of the continent, controlling and guiding its ` +
                `future from the shadows. Even though the Overlord before you appears to be dressed simply, ` +
                `undeniable power resonates within your body from his overflowing strength.`;
            statAssignmentFormula();
        } else {
            this.unknownName = 'Powerful Bandit';
            this.unknownDescription =
                'The very space around you trembles as the presence of some being enters your vicinity. As you turn to look, a being cloaked in black shadows slowly walks toward you.';
            this.knownName = 'Bandit Proginator';
            this.knownDescription =
                `The very space around you trembles as the presence of a Bandit Proginator nears. Said to be direct descendents of the first bandit Lucious nearly 5,000 years ago, ` +
                `Bandit Proginators dedicate to their lives to perfecting plundering as an art. Only once the entire world is plundered will they be satisfied. And, for the one before you, ` +
                `he seems intent to start with you.`;
            statAssignmentFormula();
        }

        if (this.level > 4) {
            this.unknownDescription = `A new type of bandit appears before you with unknown strength. All you can tell is that it's strong.`;
        }
    }
}
