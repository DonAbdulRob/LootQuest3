# LootQuest3 Release Goals for 1.0:

This document has all of the planned goals for Loot Quest's completion, iterated periodically as goals are met.

## TODO - HIGH PRIO/CONTINUAL:

- Continue using comments and 'let' and 'const' as appropriate.
- Polish existing features as needed.
- Play and identify what is needed to make things 'work' and put in list format here for later task delegation.
   - Using item in combat, equpping items = use a turn.
   - Unable to save/load while in combat, etc.
- Keep styling game to look nice. (don't forget icons eventually instead of buttons everywhere)


- Started work on help page. (#6 in short-term);
- Working on skills. 
   - Added mana, stamina resources. +
   - Added status system. +
   - Refactor interfaces for stat blocks. +
   - Refactored items, equipment, abilities, etc. to all be distinct classes with comments. +
   - Added architectural notes relating to how 'core effects' work internally. +
   - Style skills. Create popup on hover.
   - Move combat screen to main game area.


## TODO - Short Term:

1. Implement 1 player skill, 1 enemy skill.
   - Implement mana to power skills.
   - Implement 'Defend and Flee' combat options.
   - Add 'Power Strike' skill to deal +2 attack damage at the cost of some mana.
2. Settings Page (note: PAGE, not window).
3. Better game start logic.
   i. Re-enable intro screen, style a bit better and allow transition to 'New Game' state.
   ii. In 'New Game' screen, allow character name picking & difficulty selection.
4. Start work toward removal of enemy window.
   i. Show monster description and image in combat window.
   note: Create instance of 'Character' window with enemy as the fighter arg and isPlayer set to true to view all hidden stats.
5. Leveling
   i. More health from leveling. More damage after a few levels?
6. Help Page.
7. Proper transitions between all pages.
8. Area Select window.
   i. Monster specific item drop pools.

## TODO - Medium Term:

1. Explore addition of other features to add to short-term.
   - Shop
   - Item Rarity
   - Console Input (?)
   - More Skills
2. Settings menu? 

## TODO: Long Term:

1. Flesh out systems to have content for implemented systems up to level 10.
2. Multiple enemies?
3. Co-Op? Multiplayer?
4. Item identification system?

# Already Done.

1. Implement ability to display content dynamically into the Floating Window components. (Pass entire components into them? Sure, why not)
2. Implement 'fighter' data structures.
3. Integrate player data structures into a floating window.
4. Create a combat floating window to find new foes to fight and handle combat transitions.
5. Create a floating window for enemies that display their stats too.
6. Implement actual combat mechanisms. (turn-based hits to the death)

- Independent Console Window has been added.
- Finish loot display component.
- Cheat Window (should be easy now with global state
x Create right-click menu for inv. (prio lowered)

## Large older section marked done 6/10/2022:

+   Get short-term 1-3 working on a primitive level.

1. Implement inventory and equipment floating windows and systems. +
   a. Create inventory data structure and floating window to display. +
   b. Create equipment data structure and floating window to display. +
   c. Implement ability to click items between the two data structures to move items between the two freely. +
      i. Needs to be able to handle inventory being full and swapping items between the two systems when needed. 
         1. Requires capping inventory size mechanics.
   d. Add ability to right-click inventory items to show popover and select 'equip' to manually equip. (come back on step '5') x
   e. Add ability to right-click inventory items to show popover and select 'destroy' to destroy. (come back on step '5') x

2. Implement cheat window to manipulate player and enemy data freely.
   a. Implement a GameState context to better manage the huge amount of props getting passed into windows that may continue to expand indefinitely. +
   b. Should be able to modify health, damage and names of combatants with data-bound logic. x (will add as needed)

3. Implement looting from combat.
   a. Create 'not in combat' state for combat window. +
   b. Add ability to start combat while in not in combat state. +
   c. Implement transition from non-combat to combat. +
   d. Implement transition for combat window to a loot window on combat end (i.) or death screen (ii.).
      i. loot screen +
         1. Loot screen should contain items. +
         2. On click, items transfer to inventory. +
         3. Give option to click item to transfer to inventory or right-click menu option to transfer. x
         4. Add button to end loot phase, resetting combat window to empty state. +
      ii. death screen 1. display game over and ability to restart (send back to intro screen, reset game data). (we chose to revive player instead) x


+ 1. Smarter window logic: store window position to prevent constant resets, allow resizing windows
+ 2. Add health potion drop from monsters for healing. Add ability to consume using 'use' button (in place of equip).
+ 3. Add save/load.