# LootQuest3 Release Goals for 1.0:

This document has all of the planned goals for Loot Quest's completion.

## TODO - HIGH PRIO - CONTINUAL:

- N/A - Continue using comments and 'let' and 'const' as appropriate.
- Get short-term 1-3 working on a primitive level.

## TODO - Short Term:

1. Implement inventory and equipment floating windows and systems. +
    a. Create inventory data structure and floating window to display. +
    b. Create equipment data structure and floating window to display. +
    c. Implement ability to click items between the two data structures to move items between the two freely. +
        i. Needs to be able to handle inventory being full and swapping items between the two systems when needed.
            1. Requires capping inventory size mechanics.
    d. Add ability to right-click inventory items to show popover and select 'equip' to manually equip. (come back on step '5')
    e. Add ability to right-click inventory items to show popover and select 'destroy' to destroy. (come back on step '5')

2. Implement cheat window to manipulate player and enemy data freely.
    a. Implement a GameState context to better manage the huge amount of props getting passed into windows that may continue to expand indefinitely.
    b. Should be able to modify health, damage and names of combatants with data-bound logic.

3. Implement looting from combat.
    a. Create 'not in combat' state for combat window.
    b. Add ability to start combat while in not in combat state.
    c. Implement transition from non-combat to combat.
    d. Implement transition for combat window to a loot window on combat end (i.) or death screen (ii.).
        i. loot screen
            1. Loot screen should contain items.
            2. On click, items transfer to inventory.
            3. Give option to click item to transfer to inventory or right-click menu option to transfer.
            4. Add button to end loot phase, resetting combat window to empty state.
        ii. death screen
            1. display game over and ability to restart (send back to intro screen, reset player data).

4. Implement 3 player skills and 3 enemy skills for combat diversity.

## TODO - Medium Term:

5. Actually style the game to look nice. Add proper intro screen with game settings and character select (name, difficulty, etc.).
6. Add health potion drop from monsters for healing. Add ability to right-click in inventory to use them.
7. Implement World Map Feature to explore. Random fights start from world map.

## TODO: Long Term:

8. Flesh out systems to have content for implemented systems up to level 10.

# Already Done.

1. Implement ability to display content dynamically into the Floating Window components. (Pass entire components into them? Sure, why not)
2. Implement 'fighter' data structures.
3. Integrate player data structures into a floating window.
4. Create a combat floating window to find new foes to fight and handle combat transitions.
5. Create a floating window for enemies that display their stats too.
6. Implement actual combat mechanisms. (turn-based hits to the death)
- Independent Console Window has been added.