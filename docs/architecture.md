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
