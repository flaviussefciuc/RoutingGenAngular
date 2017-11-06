import { QuestionType } from "../enums/question-type.enum";

export interface IQuestion {
    id?: number;
    name?: string;
    questionText?: string;
    type?: QuestionType;
    posStart?: number;
    posEnd?: number;
}

export class Question implements IQuestion {
    id = 0;
    name = "";
    questionText = "";
    type = 0;
    posStart = 0;
    posEnd = 0;

    constructor(model?: IQuestion) {
        if (model) {
            this.id = model.id || 0;
            this.name = model.name || "";
            this.questionText = model.questionText || "";
            this.type = model.type || 0;
            this.posStart = model.posStart || 0;
            this.posEnd = model.posEnd || 0;
        }
    }
}