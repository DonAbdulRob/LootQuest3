# Architecture

- public/index.html is application main entry point. Creates <div id="root"></div>
- Index.tsx is called by react or some other dependency to bootstart the rest of the application
- Index.tsx includes <App />, that creates the component specified in App.tsx
- Component <App /> calls <Main /> contained in Main.tsx
- Component <Main /> routes to other components based on application state.
    - Routes to <PlayPage />
        Contains 'Windows' that are defined within the 'WindowContent' folder.
    - Routes to <IntroPage />
        Contains generic page elements to navigate away from start menu to the <PlayPage /> component.

# Design Considerations

To demonstrate mastery with the React framework itself, I use as few 3rd party tools as possible. This is why there are no 3rd party statement-management library, routing library, etc.

Also, it's 2022... most of them are no longer necessary anyway.... (controversial, I know)

# Why execute Force Refresh? The 'startFight' example. (95821)

Problem:

React really sucks at triggering re-renders for nested objects, because useState() only looks for changes to the root element's pointer.
Primitives are easy to deal with, but complex objects are a pain for this reason.
For instance, in startFight, calling advance() changes the combatState, but isn't picked up by React by default when using setState()

Alternative Solution:

An alternative solution that I considered was to use the spread operator on class to create a clone and change properties like that, similar to what I do in other areas.
However, react fails to pick up the changed state for future iterations of startFight() AFTER the first use.

Example:

combatState.advance();
setCombatState(() => {
    return combatState;
});

This codes increments combatState as expected. This code (that attempts to change combatReference internal pointer) works once, then fails after:

combatState.advance();
setCombatState(() => {
    combatState = {...combatState};
    return combatState;
});

So, yeah, after like 3 hours, I decided to just go with manual refreshes from now on whenever there is nested state change that react is failing to pick up.
Doing this avoids the hassle of dealing with setState not detecting changes or trying to reconfigure the object in such a way that react will pick up a state change.
