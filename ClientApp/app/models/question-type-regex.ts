import * as XRegExp from 'xregexp';


export class QuestionTypeRegex {

    public openEnd: any;
    public categorical: any;

    constructor() {

        this.openEnd = XRegExp(`(?<questionName> [a-zA-Z]+([a-zA-Z0-9_])*) -? #questionName
        (\\s*)
        (?<questionText> ((\"[^"]*\")|(-))) -? #questionText
        \\s*text\\s*(\\[(\\d)*\\s*\\.\\.\\s*(\\d)*\\])?\\s*;
        `, 'gx');

        this.categorical = XRegExp(`(?<questionName> [a-zA-Z]+([a-zA-Z0-9_])*) -? #questionName
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
        
    }

}