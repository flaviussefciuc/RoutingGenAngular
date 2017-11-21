import { Component, OnInit} from '@angular/core';
import * as XRegExp from 'xregexp';

import { Question } from '../../models/question.model';
import { OpenEndQuestion } from '../../models/open-end-question.model';
import { CategoricalQuestion } from '../../models/categorical-question.model';
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
    QuestionType = QuestionType;

    public openEnd = XRegExp(`(?<questionName> [a-zA-Z]+([a-zA-Z0-9_])*) -? #questionName
    (\\s*)
    (?<questionText> ((\"[^"]*\")|(-))) -? #questionText
    \\s*text\\s*(\\[(\\d)*\\s*\\.\\.\\s*(\\d)*\\])?\\s*;
    `, 'gx');

    public categorical = XRegExp(`(?<questionName> [a-zA-Z]+([a-zA-Z0-9_])*) -? #questionName
    \\s*
    (?<questionText> ((\\"[^"]*\")|(-))) -? #questionText
    \\s*
    (\\[(?:\[??[^\\[]*?\\])){0,1}
    \\s*
    categorical
    \\s*
    \\[
    (?<lowerLimit> \\d?) -? #lowerLimit
    \\.\\.\\d?\\]
    \\s*
    \\{
    \\s*
    (?<answerList>(_\\d*\\s+\\"[^"]*\\"\\s*((fix|other|exclusive)*\\s*)*,?\\s*)*) -? #answerList
    \\}
    \\s*(ran|rot|asc|desc)?\\s*;
    `, 'gx');

    public date = XRegExp(
        `(?<year>  [0-9]{4} ) -?  # year
     (?<month> [0-9]{2} ) -?  # month
     (?<day>   [0-9]{2} )     # day`, 'x');

    ngOnInit() {
        this.textAreaInput = "1999-12-12 2017-05-19";
    }
    public matchExp() {

        this.questionList = new Array<Question>();

        //Open end:
        this.matches = XRegExp.match(this.textAreaInput, this.openEnd, 'all');        
        
        
        for (var result in this.matches) {
            this.match = XRegExp.exec(this.matches[result], this.openEnd);

            this.tempQuestion = new OpenEndQuestion;
            this.tempQuestion.name = this.match.questionName;
            this.tempQuestion.questionText = this.match.questionText;
            this.tempQuestion.type = 2;
            this.tempQuestion.posStart = this.textAreaInput.indexOf(this.matches[result]);
            this.tempQuestion.posEnd = this.tempQuestion.posStart + this.matches[result].length;


            this.questionList.push(this.tempQuestion);
   
        }
        
        //Categorical:
        this.matches = XRegExp.match(this.textAreaInput, this.categorical, 'all'); 

        for (var result in this.matches) {
            this.match = XRegExp.exec(this.matches[result], this.categorical);
            this.tempCategoricalQuestion = new CategoricalQuestion;
            this.tempCategoricalQuestion.name = this.match.questionName;
            this.tempCategoricalQuestion.questionText = this.match.questionText;
            this.tempCategoricalQuestion.type = 1;
            this.tempCategoricalQuestion.posStart = this.textAreaInput.indexOf(this.matches[result]);
            this.tempCategoricalQuestion.posEnd = this.tempCategoricalQuestion.posStart + this.matches[result].length;
            this.tempCategoricalQuestion.lowerLimit = this.match.lowerLimit;


            this.questionList.push(this.tempCategoricalQuestion);

        }

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
}