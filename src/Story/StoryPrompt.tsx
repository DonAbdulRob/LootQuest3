export class StoryPrompt {
    body: string;
    responses: JSX.Element[];
    introFunction?: Function;

    constructor(body: string, responses: JSX.Element[], introFunction?: Function) {
        this.body = body;
        this.responses = responses;
        this.introFunction = introFunction;
    }
}
