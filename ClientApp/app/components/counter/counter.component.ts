import { Component } from '@angular/core';
import * as XRegExp from 'xregexp';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;
    public result: string;
    public result2: number;
    public match: any;

    public categorical = XRegExp(`(?<questionName> [a-zA-Z]+([a-zA-Z0-9_])*) -? #questionName
    (\\s*)
    (?<questionText> ((\"[^"]*\")|(-))) -? #questionText
    \\s*text\\s*(\\[(\\d)*\\s*\\.\\.\\s*(\\d)*\\])?\\s*;
    `,'gx');

    public date = XRegExp(
        `(?<year>  [0-9]{4} ) -?  # year
     (?<month> [0-9]{2} ) -?  # month
     (?<day>   [0-9]{2} )     # day`, 'x');

    public incrementCounter() {
        this.currentCount++;
        
        this.match = XRegExp.exec('Q1 "text" text;', this.categorical);
        
        if (this.match)
            this.result = this.match.questionName;
        //this.result = this.match.month;
        this.result = this.match.day;
        

    }
}
