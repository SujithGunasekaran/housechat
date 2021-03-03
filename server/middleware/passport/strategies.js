
const { Strategy } = require('passport-strategy');

// Strategy get data ( email, password ) needed to Authenticate user
// strategy gets callback function that will contain functionality to user
// Strategy must have authenticate function
// Strategy has access to error, success, fail function

class GraphqlStrategy extends Strategy {

    constructor(verify) {
        super();
        if (!verify) {
            throw new Error('Grapql Strategy needs verfiy callback');
        }
        this.verify = verify;
        this.name = "graphql"
    }


    authenticate(_, userData) {

        // done will receive "error", "user", "info"

        const done = (error, user, info) => {
            if (error) {
                return this.error(error);
            }
            if (!user) {
                return this.fail(401);
            }

            return this.success(user, info);
        }

        this.verify(userData, done)
    }

}

module.exports = GraphqlStrategy;