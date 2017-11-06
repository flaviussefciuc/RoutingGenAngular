import { Component} from '@angular/core';
import * as XRegExp from 'xregexp';

@Component({
    selector: 'metadata',
    templateUrl: './metadata.component.html'
})
export class MetadataComponent {
    public textAreaInput: string;
    public result: string;
    public match: any;
    public matches: any[];

    public categorical = XRegExp(`(?<questionName> [a-zA-Z]+([a-zA-Z0-9_])*) -? #questionName
    (\\s*)
    (?<questionText> ((\"[^"]*\")|(-))) -? #questionText
    \\s*text\\s*(\\[(\\d)*\\s*\\.\\.\\s*(\\d)*\\])?\\s*;
    `, 'gx');

    public date = XRegExp(
        `(?<year>  [0-9]{4} ) -?  # year
     (?<month> [0-9]{2} ) -?  # month
     (?<day>   [0-9]{2} )     # day`, 'x');


    public matchExp() {

        //this.match = XRegExp.exec(this.textAreaInput, this.date);        

        this.matches = XRegExp.match(this.textAreaInput, this.date, 'all');

        
        for (var result in this.matches) {
            this.match = XRegExp.exec(this.matches[result], this.date); 
        }
        this.result = this.matches[0].year;
        this.result = this.matches[1].year;
        //if (this.match)
        //    this.result = this.match.questionName;
        //if (this.match)
        //    this.result = this.match.year;

    }
}