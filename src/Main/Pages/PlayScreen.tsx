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
    var [uniqueKey, setUniqueKey] = React.useState(0);

    function resetWindows() {
        setUniqueKey((uniqueKey + 1) % 2);
    }

    var player = new Fighter(true);
    var monster = new Fighter(false);
    var arr = Array(10).fill(2);

    var wPlayer = {
        title: "Character",
        contentElement: <Character fighter={player} />
    };

    var wEnemy = {
        title: "Character",
        contentElement: <Character fighter={monster}/>
    };

    var wCombat = {
        title: "Combat",
        contentElement: <Combat { ... { fighter1: player, fighter2: monster}}/>
    };

    return <div>
        <div>
            <h1>Loot Quest World Map!</h1>
        </div>
        
        <div>
            <MainButton text="Reset Windows" callBack={resetWindows}></MainButton>
            <MainButton text="Quit" callBack={openIntroScreen}></MainButton>
        </div>
        
        <div id="floating-window-container" key={uniqueKey}>
            <FloatingWindow {...wPlayer} />
            {arr.map(v => <br />)}
            <FloatingWindow {...wEnemy} />
            {arr.map(v => <br />)}
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