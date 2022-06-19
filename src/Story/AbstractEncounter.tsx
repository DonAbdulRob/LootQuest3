import { StoryPrompt } from './StoryPrompt';

export abstract class AbstractEncounter {
    abstract nextPrompt: StoryPrompt;
    abstract introLines: string[];
    abstract isOver: boolean;
}
