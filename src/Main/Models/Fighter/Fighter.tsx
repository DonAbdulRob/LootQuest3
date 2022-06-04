export default class Fighter {
    name;
    currentHealth;
    maxHealth;
    minDamage;
    maxDamage;
    
    constructor(isPlayer: boolean) {
        if (isPlayer) {
            this.name = "Joe";
            this.currentHealth = 100;
            this.maxHealth = 100;
            this.minDamage = 2;
            this.maxDamage = 4;
        } else {
            this.name = "Monster";
            this.currentHealth = 20;
            this.maxHealth = 20;
            this.minDamage = 1;
            this.maxDamage = 3;
        }
    }
}
