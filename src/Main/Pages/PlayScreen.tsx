import React from "react";
import Fighter from "../Models/Fighter/Fighter";
import MainButton from "../components/Buttons/MainButton";
import FloatingWindow from "../components/FloatingWindow/FloatingWindow";
import Character from "../WIndowContent/Character/Character";
import Combat from "../WIndowContent/Combat/Combat";
import { PageProps } from "./Shared/PageBaseProps";

function openIntroScreen(props: PageProps) {
    props.setPage(0);
}

export function PlayScreen(props: PageProps) {
    let [uniqueKey, setUniqueKey] = React.useState(0);
    let [player, setPlayer] = React.useState(new Fighter(true));
    let [enemy, setEnemy] = React.useState(new Fighter(false));
    
    function resetWindows() {
        setUniqueKey((uniqueKey + 1) % 2);
    }

    let arr = Array(10).fill(2);

    let wPlayer = {
        title: "Player",
        contentElement: <Character {...{fighter: player, setFighter: setPlayer}} />
    };

    let wEnemy = {
        title: "Enemy",
        contentElement: <Character {...{fighter: enemy, setFighter: setEnemy}} />
    };

    let wCombat = {
        title: "Combat",
        contentElement: <Combat { ... { player: player, enemy: enemy, setPlayer: setPlayer, setEnemy: setEnemy}}/>
    };

    let counter = 0;
    
    return <div>
        <div>
            <h1>Loot Quest World Map!</h1>
            {player.name}
        </div>
        
        <div>
            <MainButton text="Reset Windows" callBack={resetWindows}></MainButton>
            <MainButton text="Quit" callBack={openIntroScreen}></MainButton>
        </div>
        
        <div id="floating-window-container" key={uniqueKey}>
            <FloatingWindow {...wPlayer} />
            {arr.map(v => <br key={counter++}/>)}
            <FloatingWindow {...wEnemy} />
            {arr.map(v => <br key={counter++}/>)}
            <FloatingWindow {...wCombat} />
        </div>
    </div>;
}

/**
 * 
<div>
    <h1>Equipment</h1>
</div>

<div>
    <h1>Inventory</h1>
</div>
 */