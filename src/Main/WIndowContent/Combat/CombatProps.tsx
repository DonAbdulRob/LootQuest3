import Fighter from "../../Models/Fighter/Fighter";
import CombatState from "../../Models/Shared/CombatState";
import { ConsoleData } from "../Console/Console";

export default interface CombatProps {
    player: Fighter;
    enemy: Fighter;
    combatState: CombatState;
    combatLog: ConsoleData;
    setPlayer: Function;
    setEnemy: Function;
    setCombatState: Function;
    setCombatLog: Function;
}