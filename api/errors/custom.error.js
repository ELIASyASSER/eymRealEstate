import customErrors from "./customErrors.js";

class customError extends customErrors{
    constructor(message) {
        super(message)
        this.statusCode = 500;
    }
}
export default customError