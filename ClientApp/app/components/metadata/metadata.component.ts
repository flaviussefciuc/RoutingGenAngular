import { Component, OnInit} from '@angular/core';
import * as XRegExp from 'xregexp';

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


    public categorical = XRegExp(`(?<questionName> [a-zA-Z]+([a-zA-Z0-9_])*) -? #questionName
    (\\s*)
    (?<questionText> ((\"[^"]*\")|(-))) -? #questionText
    \\s*text\\s*(\\[(\\d)*\\s*\\.\\.\\s*(\\d)*\\])?\\s*;
    `, 'gx');

    public date = XRegExp(
        `(?<year>  [0-9]{4} ) -?  # year
     (?<month> [0-9]{2} ) -?  # month
     (?<day>   [0-9]{2} )     # day`, 'x');

    ngOnInit() {
        this.textAreaInput = "1999-12-12 2017-05-19";
    }
    public matchExp() {

        
        //this.match = XRegExp.exec(this.textAreaInput, this.date);        

        this.matches = XRegExp.match(this.textAreaInput, this.date, 'all');

        
        for (var result in this.matches) {
            this.match = XRegExp.exec(this.matches[result], this.date);
            this.startMatch = this.textAreaInput.search(this.matches[result]);
            this.endMatch = this.startMatch + this.matches[result].length;
        }
        this.result = this.matches[0].year;
        this.result = this.matches[1].year;
        //if (this.match)
        //    this.result = this.match.questionName;
        //if (this.match)
        //    this.result = this.match.year;

        

    }
}