import React from "react";
import MainButton from "../Buttons/MainButton";
import FloatingWindow from "../FloatingWindow/FloatingWindow";
import { PageProps } from "./Lib/PageBaseProps";

function openIntroScreen(props: PageProps) {
    props.data.setPage(0);
}

export function WorldMap(props: PageProps) {
    var [uniqueKey, setUniqueKey] = React.useState(0);

    function resetWindows() {
        setUniqueKey((uniqueKey + 1) % 2);
    }

    var inventoryWindowData = {
        title: "Inventory"
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
            <FloatingWindow data={inventoryWindowData} />
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