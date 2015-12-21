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


var stateHelpers = {
    /**
     * Advance the currently served token 
     *
     * @param {int} desk number to serve the advanced token
     * @return {int} the token to be served by the desk passed
     */
    advanceToken(desk) {
        desk = desk || 1;
        
        state.lastCalledToken++;

        return state.desks.set(desk, state.lastCalledToken).get(desk);
    },

    /**
     * Get a new token
     *
     * Give a new token for a new person joining the queue
     *
     * @return {int} the new queue token
     */
    getNewToken() {
        state.lastGivenToken++;
        return state.lastGivenToken;
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
     * @return {object} Object where 
     *                  keys are the desk number and
     *                  values are the token served
     */
    getDesks() {
        var desks = {};

        state.desks.forEach((value, key) => {
            desks[key] = value;
        });
        return desks;
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


module.exports = stateHelpers;