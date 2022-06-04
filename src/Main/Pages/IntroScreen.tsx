import * as React from "react";
import MainButton from "../components/Buttons/MainButton";
import { PageProps } from "./Shared/PageBaseProps";

// To start, we are on current page 0.
export default function IntroScreen(props: PageProps) {
    function openMainPage() {
        props.setPage(1);
    }
    
    return <div id="IntroScreen" className="container">
        <div className="mb-1">
            <br />
        </div>

        <div className="p-5 mb-2 bg-primary text-white rounded">
            <h1 className="mt-5 mb-5 text-center">Welcome to LootQuest 2!</h1>
        </div>

        <div className="center">
            <MainButton text="Start" callBack={openMainPage}></MainButton>
            <br />
        </div>
    </div>;
}