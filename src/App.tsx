/**
 * The main component handles the highest-level routing of pages based on user interaction.
 * See the 'Pages' folder for various pages.
 */

import * as React from 'react';
import IntroPage from './Pages/IntroPage';
import { PlayPage } from './Pages/PlayPage';
import { PageProps } from './Pages/SharedProps/PageBaseProps';

function getDesiredPage(currentPage: number, setPage: Function): JSX.Element {
    let data: PageProps = {
        page: currentPage,
        setPage: setPage,
    };

    switch (currentPage) {
        case 0:
            return <IntroPage {...data} />;
        case 1:
            return <PlayPage {...data} />;
        default:
            return <IntroPage {...data} />;
    }
}

export default function App(): JSX.Element {
    // 0 = intro, 1 = main game page
    const [page, setPage] = React.useState(1);

    return getDesiredPage(page, setPage);
}
