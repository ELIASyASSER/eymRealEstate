import customErrors from "./customErrors.js";

class forBidden extends customErrors{
    constructor(message) {
        super(message)
        this.statusCode = 403;
    }
}
export default forBidden