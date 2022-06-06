export enum CombatStateEnum {
    OUT_OF_COMBAT,
    IN_COMBAT,
    LOOTING
}

export default class CombatState {
    round: number = 0;
    combatState: number = 0;
    
    advance = () => {
        this.combatState = (this.combatState + 1) % 3;
    }
}
