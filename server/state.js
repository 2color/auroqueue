var EventEmitter = require('events').EventEmitter;

/**
 * Server state
 *  
 * Contains the app state.
 * The app state is not persisted in anyway so a reload resets the state
 * to the initial value
 * 
 * The state is private. 
 * Only the helpers object is public.
 */
const state = {
    /**
     * Last served token is the last token number 
     * that has been called to a desk
     */
    lastCalledToken: 0,

    /**
     * Last token number given.
     */
    lastGivenToken: 0,

    /**
     * A map for desks/token
     * key: {int} desk number
     * value: {int} token number
     */
    desks: new Map()
};



var stateApi = {
    /**
     * Advance the currently served token 
     *
     * @param {int} desk number to serve the advanced token
     * @return {int} the token to be served by the desk passed
     */
    advanceToken(desk) {
        desk = desk || 1; //if no desk passed advance table 1
        
        state.lastCalledToken = this.getIncremental(state.lastCalledToken);

        return state.desks.set(desk, state.lastCalledToken).get(desk);
    },

    /**
     * Get a new token
     *
     * Give a new token for a new person joining the queue
     *
     * Reset the token to 1 after 99
     *
     * @return {int} the new queue token
     */
    getNewToken() {
        state.lastGivenToken = this.getIncremental(state.lastGivenToken);

        return state.lastGivenToken;
    },


    getIncremental(number) {
        return (number < 99) ? (number + 1) : 1;
    },

    /**
     * Get desks
     *
     * Give an object of all the desks and the token they are serving
     * Converts the Map to Object. This makes it usable anywhere 
     * and allows easy JSON serialization for passing to the client
     *
     * This means there's an implicit conversion to string of the key
     *
     * @return {object} Object with 
     *                  desks: {object}
     *                      keys are the desk number and
     *                      values are the token served
     *                  lastCalledToken: {integer}
     *                  lastGivenToken: {integer}
     *
     */
    getState() {
        var stateCopy = {
            desks: {},
            lastGivenToken: state.lastGivenToken,
            lastCalledToken: state.lastCalledToken
        };

        state.desks.forEach((value, key) => {
            stateCopy.desks[key] = value;
        });

        return stateCopy;
    },


    /**
     * Get the last called Token
     *
     * @return {int} last called token
     */
    getLastCalledToken() {
        return state.lastCalledToken;
    }

};


module.exports = stateApi;