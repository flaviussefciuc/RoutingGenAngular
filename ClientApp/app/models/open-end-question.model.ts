import { Question, IQuestion } from "../models/question.model";

export interface IOpenEndQuestion extends IQuestion{
    lowerLimit?: number;
    higherLimit?: number;
}

export class OpenEndQuestion extends Question implements IOpenEndQuestion{
    lowerLimit?: number;
    higherLimit?: number;


    constructor(model?: IQuestion) {
        super(model);
    }

}

