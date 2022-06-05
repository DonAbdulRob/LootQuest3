/**
 * The main component handles the highest-level routing of pages based on user interaction.
 * See the 'Pages' folder for various pages.
 */

import * as React from "react";
import { PageProps } from "./Pages/SharedProps/PageBaseProps";
import IntroPage from "./Pages/IntroPage";
import { PlayPage } from "./Pages/PlayPage";

function getDesiredPage(currentPage: number, setPage: Function) {
    let data: PageProps = {
        page: currentPage,
        setPage: setPage,
    };

    switch (currentPage) {
        case 0:
            return <IntroPage {...data}/>;
        case 1:
            return <PlayPage {...data}/>;
    }
}

export default function Main() {
     // 0 = intro, 1 = main game page
    const [page, setPage] = React.useState(1);

    return (
        <div>
            {getDesiredPage(page, setPage)}
        </div>
    );
}
