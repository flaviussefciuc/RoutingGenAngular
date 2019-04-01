import * as XRegExp from 'xregexp';

export class Precode{
    precode: string;
    label: string;
    regex: any;

    constructor(precode:string, label:string) {
        this.precode = precode;
        this.label = label;

        this.regex = XRegExp(`(?<precode> [a-zA-Z_]+([a-zA-Z0-9_])*) -? #precode        
        (\\s*)
        (?<precodeLabel> ((\"[^"]*\")|(-))) -? #precodeLabel
        \\s*text\\s*(\\[(\\d)*\\s*\\.\\.\\s*(\\d)*\\])?\\s*;
        `, 'gx');
    }

}