import { IRootStore } from '../Models/GlobalGameStore';
import { AbstractEncounter } from './AbstractEncounter';
import { StoryPrompt } from './StoryPrompt';

export class BaseEncounter implements AbstractEncounter {
    nextPrompt: StoryPrompt = new StoryPrompt('', []);
    introLines: string[] = [];
    isOver: boolean = false;
    store: IRootStore;

    constructor(state: IRootStore) {
        this.store = state;
    }

    /**
     * This is our primary method of changing the prompt.
     * We use this to maek sure that 'introFunction' is called and any other required side-effects.
     * @param newPrompt Our new story prompt.
     */
    goToPrompt(newPrompt: StoryPrompt) {
        if (this.nextPrompt.introFunction !== undefined) {
            this.nextPrompt.introFunction();
        }

        this.nextPrompt = newPrompt;
    }
}
