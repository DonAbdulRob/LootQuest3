import * as React from "react";
import IntroScreen from "./Pages/IntroScreen";
import { WorldMap } from "./Pages/WorldMap";
import { PagePropsCore } from "./Pages/PageBase";

function getDesiredPage(currentPage: number, setPage: Function) {
    var data: PagePropsCore = {
        page: currentPage,
        setPage: setPage
    };

    switch (currentPage) {
        case 0:
            return <IntroScreen data={data}/>;
        case 1:
            return <WorldMap data={data}/>;
    }
}

export default function Main() {
    const [page, setPage] = React.useState(1);

    return (
        <div>
            {getDesiredPage(page, setPage)}
        </div>
    );
}
