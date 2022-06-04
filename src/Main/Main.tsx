import * as React from "react";
import IntroScreen from "./Pages/IntroScreen";
import { PageProps } from "./Pages/Shared/PageBaseProps";
import { PlayScreen } from "./Pages/PlayScreen";

function getDesiredPage(currentPage: number, setPage: Function) {
    let data: PageProps = {
        page: currentPage,
        setPage: setPage,
    };

    switch (currentPage) {
        case 0:
            return <IntroScreen {...data}/>;
        case 1:
            return <PlayScreen {...data}/>;
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
