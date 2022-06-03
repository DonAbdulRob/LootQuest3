import React from "react";
import MainButton from "../Buttons/MainButton";
import FloatingWindow from "../FloatingWindow/FloatingWindow";
import { PageProps } from "./PageBase";

export function WorldMap(props: PageProps) {
    function openIntroScreen() {
        props.data.setPage(0);
    }
    
    return <div>
        <div>
            <h1>World Map</h1>
        </div>
        
        <FloatingWindow />
        
        <div>
            <MainButton text="Quit" callBack={openIntroScreen}></MainButton>
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