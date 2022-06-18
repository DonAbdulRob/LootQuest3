# Architecture

-   public/index.html is application main entry point. Creates <div id="root"></div>
-   Index.tsx is called by react or some other dependency to bootstart the rest of the application
-   Index.tsx includes <App />, that creates the component specified in App.tsx
-   Component <App /> calls <Main /> contained in Main.tsx
-   Component <Main /> routes to other components based on application state.
    -   Routes to <PlayPage />
        Contains 'Windows' that are defined within the 'WindowContent' folder.
    -   Routes to <IntroPage />
        Contains generic page elements to navigate away from start menu to the <PlayPage /> component.

# Design Considerations

To demonstrate as much mastery with React as possible, I minimize my use of 3rd party tools, like routers, GUI tools, etc. The only one that I really use is Zustand for state management. But, even that is only purely for convenience, rather than as a necessity.

The reasons for this is because I use many 3rd party tools at my professional work, so having this project serves as a different representation of my skills.

Also, it's 2022... most 3rd party libraries aren't necessary anyway... (controversial, I know)

# Big-Brained Programmer Moments

1. I originally included the EPlayerAcitivity inside of the Player.tsx class. However, doing this was actually causing the Player class to be unable to find the Fighter class. I figured this out by looking at the stack trace and scanning the webpack-bundled js code to determine a solution, something that requires peak-tier programming skills to achieve. (At least imo).

# Why execute Force Refresh everywhere? (95821)

In short, I use Force Refresh because it reduces total code, code complexity, is easy to implement and is quite fast.

From a developer's point of view, Loot Quest has a lot of data points. Take the Player class for instance. It has numerous root-level properties, like 'name', and sub-level properties, like StatBlock's and Inventory's properties. Modifying these through state management functions would require hundreds of methods to be made, ranging from SetName() to setArmor() to addInventoryItem(). And, that's just for now. As these classes expand in scale, which is typical of games, very many more methods will be needed to support trivial data changes.

So, why do that? With the Force Refresh anti-pattern, I entirely avoid that layer of work.

'But, you're modifing state directly!'

Yup! So what? The app works great and I don't need state history or any of that jazz for any reason.

'But, performance!'

Definitely not. One thing that is SUPER easy to forget is that modern technology is ridiculously powerful and efficient; even on the low-end. Don't believe me? Go ahead and hit the 'Autoplay 10,000' button in the Cheat window. Doing this will execute 10,000 combat rounds. And, for my system, I get INSTANT feedback. Actually, I don't even notice the slightest big of lag on my system until putting it at 100,000 records. And, I'm able to process a million records, albeit with some lag (you're welcome to try the Autoplay 1,000,000 button at your own risk, my system is pretty good and it takes about 4 seconds to complete).

Now, to be fair, I know that the DOM isn't getting refreshed 10,000 times or even 1,000,000 times. But, that's the beauty of state-management, right? Changes get queued up and then run efficiently. And, that's part of why performance isn't a concern.

Now, I know that most will consider this an anti-pattern, because it is, so I did try some alternatives. But, they have their own unique issue:

Alternative: Convert classes and their methods into interfaces and independent functions that can take the class object as an argument and modify it.
Issue: Lose all OOP goodness. Even the basic premise of 'implementing constructor method logic' becomes overhead. And, who wants to pass objects into every single function?

Alternative: Create a single 'modifyState' method within the store that sets state to an immer produced state. Then, whenever state values change, change them through that method.
Issue: Immer winds up freezing data seemingly at random. And, disabling Immer's freezing reveals infinite recursion calls. This shows that this implementation causes side-effects, even though it really shouldn't. (Except, for instance, when I am changing window state data... which does cause side effects and would need an entire rewrite)

Alternative: Create the 100s of methods necessary to support changes to the model classes and be 'right'!
Issue: No thanks. If this were an enterprise app for work, sure. But, here, nah.

Hence, none of the alternatives stuck. With that said this app is meant to demonstrate mastery over state, so I did go ahead and arbitrarily added some state logic into the application 'the right way'. The slice folder under models coupled with GlobalGameStore demonstrate some slicing ability, which is really about as complex as Zustand ever gets. I do also add some methods for operations that actually do get called a lot (for convenience reasons to not have to call the page refresh method everywhere, like the console adding function). But, I don't add slice methods to achieve 100% class coverage for state variables as a hard requirement.

Also, ironically, all of the time I spent trying to implement alternative state management solutions would probably have been enough time to add a 'proper' slicing infrastructure. Well, at least I learned why trying to deviate from state specifications is bad / doesn't work!

## Class Function References

Some classes, like 'AbilityList.tsx's Ability class' include a function reference as a property, rather than the literal function definition.
This is done for the sake of serialization. And, it also enables Effect Functions, contained in EffectLib.tsx, to have zero dependencies and be able to be run anywhere at any time.
Each feature's relevant 'x to core effect mapper .tsx' file can be used to match function references to their actual effect function contained within EffectLib.tsx.
EffectLib.tsx contains all of the game's unique effects.
