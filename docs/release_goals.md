# LootQuest3 Release Goals for 1.0:

This document has all of the planned goals for Loot Quest's completion, iterated periodically as goals are met.

## TODO - CONTINUAL:

- Continue using comments and 'let' and 'const' as appropriate.
- Polish existing features as needed.
- Play and identify what is needed to make things 'work' and put in list format here for later task delegation.
   - Empty!
- Keep styling game to look nice. (don't forget icons eventually instead of buttons everywhere)
- Continue work on help page.

## TODO - HIGH PRIO (Volitile scope creeping changes)

Empty! Everything is PLANNED!

## TODO - Short Term:

1. Show monster description in embedded game window during combat.
2. Hardcode stats for monsters from levels 1-5. For higher levels, use formulas.
3. Fill the 'show town stuff' section with town stuff. (Inn to heal, Shop, etc.).
4. Flesh out systems to have content for implemented systems up to level 5.
5. Add at least one 'special' encounter, like meeting the 'Wise Wizard Merlin' and having a dialog or something that could lead to a fight or item reward, etc.

## TODO - Medium Term:

1. Explore addition of other features to add to short-term.
   - Item Rarity ?
   - Console Input ?
   - More Skills ?
2. Multiple enemies?
3. Co-Op? Multiplayer?
4. Item identification system?

# Done List

For things that are done!

## Older Marked Done 6/18/2022+:

item weight has been added (stacks have been deferred for now)

1. Using item in combat, equpping items = use a combat turn.
5. Refactor game state.
   - Can probably just put all game stats on a root-level class too, so I don't have to pass state into models...

## Older Marked done 6/14/2022+:

3. Start work toward removal of enemy window. +
4. Leveling +
   i. More health from leveling. More damage after a few levels? +
5. Help Page. +
6. Proper transitions between all pages. +
1. Settings Page (note: PAGE, not window). +

- note: Create instance of 'Character' window with enemy as the fighter arg and isPlayer set to true to view all hidden stats. +

1. Resource bars in Character Panel.


1. Area Select window + Refactor of Embedded Game Window.
   i. Monster + Area specific item drop pools. x (denied, will worry about later)
   ii. Areas aren't just 'find fight'. Should be 'explore' with outcomes based on area. +
      a. Create 3 areas to start with 1 location-specific combat outcome, 1 location-specific gathering outcome and access to a non-location specific 'outcome pool'. x (partially complete, will add more later. framework is in place)
   iii. Time of Day in area window. Traveling and 'exploring' advances time. At night, increase chance of monster outcomes. x (denied, will reconsider later)
   - Actually make monster level based on area level in Combat.tsx. +
   - Area should have level range capping at player level. + (area level influences monster level. Area levels are not based on player at all.)

1. Inventory size limit.
   - Show how full it is in title. +
   - Limit looting ability based on inventory capacity. +
   - Same with transfering items. +
   - Item weights? x (deferred)

- When leveling, make sure to heal stats to full, and don't overcap.
- Defend/Flee (commented, implementation soon)

2. Settings menu? +

1. Restrict save/load feature while in combat, etc. x (denied)

- Difficulty buttons in New Game screen implemented.

## Large older section marked done 6/10/2022+:

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


+ Working on skills. 
   + Added mana, stamina resources.
   + Added status system.
   + Refactor interfaces for stat blocks.
   + Refactored items, equipment, abilities, etc. to all be distinct classes with comments.
   + Added architectural notes relating to how 'core effects' work internally.
   + Style skills. Create popup on hover.
   + Move combat screen to main game area.
   + Enemies use skills 25% of the time.

- Double check that all features still work as intended from most recent commit.

2. Better game start logic. +
   i. Re-enable intro screen, style a bit better and allow transition to 'New Game' state. +
   ii. In 'New Game' screen, allow character name picking & difficulty selection. +

## Large older section marked done (pre - 6/10/2022):

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

