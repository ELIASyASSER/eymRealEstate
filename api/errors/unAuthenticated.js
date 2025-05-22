import customErrors from "./customErrors.js";

class Unathenticated extends customErrors{
    constructor(message) {
        super(message)
        this.statusCode = 401;
    }
}
export default Unathenticated