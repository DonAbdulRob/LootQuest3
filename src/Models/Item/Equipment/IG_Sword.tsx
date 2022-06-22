import { Equipment, EquipmentType } from '../Item';
import ItemGroup from '../Shared/ItemGroup';
import { IG_Alloy } from '../Resources/IG_Alloy';
import { G_getRandomValueUpTo } from '../../Helper';

export class IG_Sword extends ItemGroup {
    static suffix: string = ' Sword';

    /**
     * Create a random oak sword with 1-1 to 2-4 damage.
     */
    static oak = () => {
        // Create Item
        let newItem: Equipment = new Equipment(
            'Oak' + IG_Sword.suffix,
            'A plain sword made from oak. Makes a decent sword for children and beginners alike.',
            2,
            1,
            EquipmentType.WEAPON,
        );

        // Set damage range.
        newItem.statBlock.damageMin = G_getRandomValueUpTo(1) + 1;
        newItem.statBlock.damageMax = Math.round(newItem.statBlock.damageMin + G_getRandomValueUpTo(1) + 1);
        return newItem;
    };

    static bronze = () => {
        // Create Item
        let newItem: Equipment = new Equipment(
            'Bronze' + IG_Sword.suffix,
            'A sword made from bronze ingots. Cheap and lethal, but watch the durability.',
            IG_Alloy.bronze().weight * 2.5,
            IG_Alloy.bronze().level + 1,
            EquipmentType.WEAPON,
        );
        // Set damage range.
        newItem.statBlock.damageMin = G_getRandomValueUpTo(2) + 2;
        newItem.statBlock.damageMax = Math.round(newItem.statBlock.damageMin + G_getRandomValueUpTo(2) + 2);
        return newItem;
    };

    static iron = () => {
        // Create Item
        let newItem: Equipment = new Equipment(
            'Iron' + IG_Sword.suffix,
            'A sword made from iron ingots. All around useful and will last for a while too',
            IG_Alloy.iron().weight * 2.5,
            IG_Alloy.iron().level + 1,
            EquipmentType.WEAPON,
        );
        // Set damage range.
        newItem.statBlock.damageMin = G_getRandomValueUpTo(3) + 3;
        newItem.statBlock.damageMax = Math.round(newItem.statBlock.damageMin + G_getRandomValueUpTo(3) + 3);
        return newItem;
    };

    constructor() {
        super([IG_Sword.oak(), IG_Sword.bronze(), IG_Sword.iron()]);
    }
}

/*
Other alloys.
IG_Alloy.steel(),
IG_Alloy.exum(),
IG_Alloy.bronze(),
IG_Alloy.diamond(),
IG_Alloy.divinite()
*/
