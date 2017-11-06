import { Question, IQuestion } from "../models/question.model";

export class OpenEndQuestion extends Question {
    _lowerLimit?: number;
    _higherLimit?: number;


    constructor(model?: IQuestion) {
        super(model);
    }

    public get lowerLimit():number {
        return this._lowerLimit || 0;
    }
    public set lowerLimit(value: number) {
        this._lowerLimit = value;
    }

    public get higherLimit(): number {
        return this._higherLimit || 9999;
    }
    public set higherLimit(value: number) {
        this._higherLimit = value;
    }

}

