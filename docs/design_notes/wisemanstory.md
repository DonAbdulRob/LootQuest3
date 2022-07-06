# Wise Man Scenario Planning Document 

This is the planning document for the Wise Man Scenario. Yes, I actually wrote down the script before coding anything... Planning is OVERPOWRED!

## Base Scenario Requirements:

- Need a core state tracker to keep track of where player is within scenario. (can be used for reversion too).
- Need a function to display text to the user in the embedded window.
- Need to create a button component to present options for the player to pick. Each option should have a callback that changes state.

## States

State 1:

You are walking through through the woods along the road when you spot a man approaching you.
The man wears Blue Robes typical of a Mage. And, given the excellent condition and quality of his outfit, you assume he must be reasonably powerful.
How do you react?

a. [Greet & Approach] > State 2
b. [Stand Still & Wait] > State 3
c. [Flee] > Flee State > State 4

* State 2:

a. You raise your arm and wave toward the man while yelling, "Hello there!"
Hearing this, the man responds, "Greetings fellow traveler!"
> State 5

* State 3:

b. You choose to stand still and wait for the man to act first.
Once the man is closer, he says, "Greetings fellow traveler."
> State 5

* State 5:

The Mage grows closer and his physical features become clearer. He's an old man that appears to be in his seventies easily. Yet, he stands upright and moves forward steadily with purpose.
What do you do?

a. Greet back
b. Remain Silent
c. Attempt to Flee

a. "Greetings Mage. How be your travels?" > State 6
b. You say nothing. > State 6
c. go to 'Flee State'

State 6:

"My travels have been great. Thank you for asking.
I'm actually heading to Greevale as we speak. Can you confirm that I'm heading in the direction?"

a. Tell the Wizard that he's heading in the right direction.
b. Lie to the wizard.
c. Flee

a. "Yes. Continue down this road and you'll be there before nightfall."
> State 7 (track that you lied to the Wizard)
b. "No. The route was actually changed recently due to flooding, so you'll need to cut through the woods to make it there. Try heading that way," you say while pointing in a random direction.
> State 7 (track that you didn't lie to the Wizard)
c. Flee State.

State 7:

"Ah! Thank you so much!" the wizard responds. "Take this Oran Herb as my thanks. Now, if you'll excuse me, I must be on my way."
> State 8:

State 8:

"Farewell."

### Flee State: 

Roll a flee check. On success, end event.
On fail, Mage shouts, "Wait up!" and rushes to grab your shoulder.
You've been stopped in place.

a. Attempt to force your way free.
b. Remain Silent
c. Ask what he wants

