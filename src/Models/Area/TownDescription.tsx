import AreaDescriptions from './AreaDescriptions';

export class TownDescription extends AreaDescriptions {
    inn: string;
    shop: string;
    forge: string;
    guild: string;

    constructor(root: string, inn: string, shop: string, forge: string, guild: string) {
        super(root);
        this.inn = inn;
        this.shop = shop;
        this.forge = forge;
        this.guild = guild;
    }
}
