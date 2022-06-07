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

# Why Zustand? Why Refresh Components manually with Zustand?

I use Zustand SPECIFICALLY for the global state support that it provides because global data is pretty much essential for projects because passing data through props is clunky and cumbersome. 

Zuckland's other features are not a good fit for this project's goals.

## Why Refresh Components manually when I have Zustand?

I actually tried out Pure React, Recoil, Zustand and RX.JS libraries for state management. But, unfortunately, they are all bad fits for this project when it comes to watching for state changes. This is because:

a. Loot Quest uses a lot of objects wtih different data types.
b. These data models/objects are all massively dependendent on each other (Character Window <=> Player + Enemy <=> Combat <=> Inventory, etc.)
c. These data models are all non-trivial with multiple nested objects in some cases (Player > Statblock > health).
d. Setting up things 'the ideal way' is too time-expensive at the moment.

The big killers are points c & d, where Pure React, Zustand, Recoil, or whatever you're using do not perform deep checking of objects for state changes. React pros know this; it's a pain to setup a bunch of useState() calls to bind non-flat objects and recommendations are to flatten objects, then bind the object attributes individually that we're going to watch change to useState (or whatever library your using's) calls.

For a high-budget enterprise app with thousands of planned manhours, sure, I can go the hard route and set all of these models up and maintain them. No problem. However, for Loot Quest, we'll take the completely unnoticeable performance hit by calling refresh operations after events happen that change state attributes. The genius of this decision will become more evident as the project becomes larger and the sheer number of data-bound attributes entering existance becomes massive.
