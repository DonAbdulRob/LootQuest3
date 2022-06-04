import Fighter from "../../Models/Fighter/Fighter";

export default interface CombatProps {
    player: Fighter
    enemy: Fighter
    setPlayer: Function
    setEnemy: Function
}