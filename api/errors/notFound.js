import customErrors from "./customErrors.js";

class NotFound extends customErrors{
    constructor(message) {
        super(message)
        this.statusCode = 404;
    }
}
export default NotFound