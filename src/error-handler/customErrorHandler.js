export class customErrorHandler extends Error{
    constructor(message,code){
        super(message);
        this.code = code;   
    }
}