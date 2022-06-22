import { Equipment, EquipmentType } from '../Item';
import ItemGroup from '../Shared/ItemGroup';
import { IG_Alloy } from '../Resources/IG_Alloy';

export class IG_Chestplate extends ItemGroup {
    static suffix: string = ' Chestplate';

    static bronze = () => {
        // Create Item
        let newItem: Equipment = new Equipment(
            'Bronze' + IG_Chestplate.suffix,
            'A chestplate made from bronze ingots.',
            IG_Alloy.bronze().weight * 2.5,
            IG_Alloy.bronze().level + 1,
            EquipmentType.CHESTPLATE,
        );
        // Set damage range.
        newItem.statBlock.armor = 1;
        return newItem;
    };

    static iron = () => {
        // Create Item
        let newItem: Equipment = new Equipment(
            'Iron' + IG_Chestplate.suffix,
            'A chestplate made from iron ingots.',
            IG_Alloy.iron().weight * 2.5,
            IG_Alloy.iron().level + 1,
            EquipmentType.CHESTPLATE,
        );
        // Set damage range.
        newItem.statBlock.armor = 2;
        return newItem;
    };

    constructor() {
        super([IG_Chestplate.bronze(), IG_Chestplate.iron()]);
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
