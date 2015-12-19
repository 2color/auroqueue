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
	 * Only advances up to the last given token. Otherwise no-op
	 *
	 * @param {int} desk number to serve the advanced token
	 * @return {int} the token to be served by the desk passed
	 */
	advanceToken(desk = 1) {
		if(state.lastCalledToken >= state.lastGivenToken) {
			return false;
		}
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
	}

};


module.exports = stateHelpers;