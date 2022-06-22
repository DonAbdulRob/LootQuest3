/* eslint-disable no-fallthrough */
import { MonsterGenerator } from '../../MonsterGenerator';

export class MG_Wolf extends MonsterGenerator {
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
            this.setNames('Wolf Pup');
            this.setDescriptions(
                `A tiny wolf that must have been seperated from its pack. With it's tiny body, soft grey-fur and barely developed fangs, you can't help but want to pet it.`,
            );
            this.statBlock.healthMin = 5;
            this.statBlock.healthMax = 5;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 2;
        } else if (this.level === 2) {
            this.setNames('Young Wolf');
            this.setDescriptions(
                `A young wolf appears before you, barking aggressively nonstop. Does it hope to scare you? Or, is it calling its friends? Either way, you feel a strong urge to kick it.`,
            );
            this.statBlock.healthMin = 8;
            this.statBlock.healthMax = 8;
            this.statBlock.damageMin = 2;
            this.statBlock.damageMax = 4;
        } else if (this.level === 3) {
            this.setNames('Wolf');
            this.setDescriptions(
                `A fully grown wolf stands before you with dark-fur, large paws and black eyes. Its focused gaze lets you know that its a skilled predator that will kill you the first chance that it gets.`,
            );
            this.statBlock.healthMin = 15;
            this.statBlock.healthMax = 15;
            this.statBlock.damageMin = 4;
            this.statBlock.damageMax = 6;
        } else if (this.level === 4) {
            this.setNames('Elite Wolf');
            this.setDescriptions(
                `A wolf standing proudly at 3 feet tall with white-fur on its bottom half and black-fur on its top appears. It's large and well-defined muscle structure can be seen beneath its fur, giving you the impression that its power level is much higher than average.`,
            );
            this.statBlock.healthMin = 24;
            this.statBlock.healthMax = 24;
            this.statBlock.damageMin = 7;
            this.statBlock.damageMax = 9;
        } else if (this.level <= 7) {
            this.unknownName = 'Mysterious Wolf';
            this.knownName = 'Wolf Pack Leader';
            this.knownDescription =
                'The leader of a Wolf pack is faster, bigger, more aggressive and all around more intimidating than other wolves. And, the one before you snarls lightly as it prepares to turn you into a corpse.';
            statAssignmentFormula();
        } else if (this.level <= 10) {
            this.unknownName = 'Mysterious Wolf';
            this.knownName = 'Wolf King';
            this.knownDescription = `No wolf chooses to become a king. It simply does. A gift of both intelligence and stature naturally leads entire wolf packs to flock to them. And, the one before you wears a wooden crown and tattered leaf cape. Its expression is calm, with incalculable power and motives hidden behind its expression.`;
            statAssignmentFormula();
        } else if (this.level <= 15) {
            this.unknownName = 'Mysterious Wolf';
            this.knownName = 'Wolf Overlord';
            this.knownDescription = `Oh no! A Wolf Overlord! Wolf Overlords are so powerful that they can even call Wolf Kings with their howl. But, why would they? As an overlord, unless it is to be served, even Rat Kings aren't worth notice.`;
            statAssignmentFormula();
        } else {
            this.unknownName = 'Powerful Wolf';
            this.unknownDescription =
                'You feel a chill run down your spine. Upon turning to look, you spot a wolf that glows with azure light.';
            this.knownName = 'Wolf Proginator';
            this.knownDescription =
                `A howl comes from far away, rustling leaves and shaking the ground in a cone-shaped emenation. Turning to look, you spot what is said to be the oldest, ` +
                `most powerful and most wise of creatures. A Proginator! Bathed in azure light with motes of snowflakes infinitely falling around it, you feel a sense of dread and panic.`;
            statAssignmentFormula();
        }

        if (this.level > 4) {
            this.unknownDescription = `A new type of wolf appears before you with unknown strength. All you can tell is that it's strong.`;
        }
    }
}
