# Architecture

-   public/index.html is application main entry point. Creates <div id="root"></div>
-   Index.tsx is called by webpack to boostart the application
-   Index.tsx includes <App />, that creates the component specified in App.tsx
-   Component <App /> displays the current page specified by our Zustand store's Page Slice object (created in PageSlice.tsx by createPageSlice())
-   By default, our PageSlice loads the MainMenu Page, which includes the Main Menu component '<Main />' and some other page-related data.
-   From <Main />, we then route to other components using the globally available setPage method when necessary. So, when the user clicks the 'Start a New Advanture' button, the user is routed to the <NewGamePage />.
    -   LootQuest is a SPA (single-page application), so major screen transitions are handled in this way by calling setPage().
-   Eventually, the user will arrive on <PlayPage /> and can interact with the vast majority of the game's content from there.

## Class Function References

Some classes, like 'AbilityList.tsx's Ability class' include a function reference as a property, rather than the literal function definition.
This is done for the sake of serialization. And, it also enables Effect Functions, contained in EffectLib.tsx, to have zero dependencies and be able to be run anywhere at any time.
Each feature's relevant 'x to core effect mapper .tsx' file can be used to match function references to their actual effect function contained within EffectLib.tsx.
EffectLib.tsx contains all of the game's unique effects.
