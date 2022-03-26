export default class GenericError extends Error{
    constructor(public error: Error){
        super('An unexpected error occurred');
    }
}