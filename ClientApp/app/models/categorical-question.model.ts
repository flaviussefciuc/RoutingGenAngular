import { Question, IQuestion } from "../models/question.model";
import { Precode } from "../models/precode.model";

export class CategoricalQuestion extends Question {
    lowerLimit: number;
    upperLimit: number;
    answerList: Precode[];


    constructor(model?: IQuestion) {
        super(model);
    }


}