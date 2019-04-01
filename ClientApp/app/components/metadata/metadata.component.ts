import { Component, OnInit} from '@angular/core';
import * as XRegExp from 'xregexp';

import { Question } from '../../models/question.model';
import { OpenEndQuestion } from '../../models/open-end-question.model';
import { CategoricalQuestion } from '../../models/categorical-question.model';
import { QuestionTypeRegex } from '../../models/question-type-regex';
import { QuestionType} from '../../enums/question-type.enum';


@Component({
    selector: 'metadata',
    templateUrl: './metadata.component.html'
})
export class MetadataComponent implements OnInit{
    public textAreaInput: string;
    public result: string;
    public match: any;
    public matches: any[];
    public startMatch: number;
    public endMatch: number;
    public questionList: OpenEndQuestion[];
    public tempQuestion: Question;
    public tempCategoricalQuestion: CategoricalQuestion;
    public questionTypeRegex: QuestionTypeRegex;
    QuestionType = QuestionType;

    ngOnInit() {
        this.textAreaInput = "2017-05-19";
        this.questionTypeRegex = new QuestionTypeRegex;
    }
    public matchExp() {

        this.questionList = new Array<Question>();
                
        this.matchOpenEnd();
        this.matchCategorical();        

        //Sort QuestionList:
        this.questionList.sort((n1, n2) => {
            if (n1.posStart < n2.posStart)
            {
                return -1;
            }
            if (n1.posStart > n2.posStart) {
                return 1;
            }
            return 0;
        });
    }

    private matchOpenEnd() {

        this.matches = XRegExp.match(this.textAreaInput, this.questionTypeRegex.openEnd, 'all');

        for (var result in this.matches) {
            this.match = XRegExp.exec(this.matches[result], this.questionTypeRegex.openEnd);

            this.tempQuestion = new OpenEndQuestion;
            this.tempQuestion.name = this.match.questionName;
            this.tempQuestion.questionText = this.match.questionText;
            this.tempQuestion.type = 2;
            this.tempQuestion.posStart = this.textAreaInput.indexOf(this.matches[result]);
            this.tempQuestion.posEnd = this.tempQuestion.posStart + this.matches[result].length;

            this.questionList.push(this.tempQuestion);

        }
    }

    private matchCategorical() {

        this.matches = XRegExp.match(this.textAreaInput, this.questionTypeRegex.categorical, 'all');

        for (var result in this.matches) {
            this.match = XRegExp.exec(this.matches[result], this.questionTypeRegex.categorical);
            this.tempCategoricalQuestion = new CategoricalQuestion;
            this.tempCategoricalQuestion.name = this.match.questionName;
            this.tempCategoricalQuestion.questionText = this.match.questionText;
            this.tempCategoricalQuestion.type = 1;
            this.tempCategoricalQuestion.posStart = this.textAreaInput.indexOf(this.matches[result]);
            this.tempCategoricalQuestion.posEnd = this.tempCategoricalQuestion.posStart + this.matches[result].length;
            this.tempCategoricalQuestion.lowerLimit = this.match.lowerLimit;


            this.questionList.push(this.tempCategoricalQuestion);

        }
    }
}