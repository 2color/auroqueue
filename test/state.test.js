const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const stateApi = require('../server/state');


lab.experiment('state', () => {
    var state;

    lab.test('advanceToken returns a number', (done) => {
        state = stateApi.advanceToken();
        Code.expect(state).to.be.an.number();
        done();
    });

    lab.test('getState returns an object', (done) => {
        state = stateApi.getState();
        Code.expect(state).to.be.an.object();
        done();
    });

    lab.test('getState has the right keys', (done) => {
        state = stateApi.getState();
        Code.expect(state.desks).to.be.an.object();
        Code.expect(state.lastCalledToken).to.be.a.number();
        Code.expect(state.lastGivenToken).to.be.a.number();
        done();
    });

    lab.test('advanceToken starts with 1', (done) => {
        Code.expect(state.lastCalledToken).to.equal(1);
        done();
    });

    lab.test('advanceToken defaults to desk 1', (done) => {
        Code.expect(state.desks['1']).to.equal(1);
        done();
    });

    lab.test('getNewToken starts from 1', (done) => {
        Code.expect(stateApi.getNewToken()).to.equal(1);
        done();
    });

    lab.test('advanceToken defaults to desk 1 when no desk number is passed', (done) => {
        stateApi.advanceToken();   

        Code.expect(stateApi.getState().desks).to.be.an.object();
        Code.expect(stateApi.getState().desks['1']).to.equal(stateApi.getLastCalledToken());
        stateApi.advanceToken();   
        Code.expect(stateApi.getState().desks['1']).to.equal(stateApi.getLastCalledToken());
        done();
    });

    
    lab.test('getIncremental goes from 1 to 99 and starts again with 1', (done) => {

        for (var i = 0; i < 110; i++) {
            Code.expect(stateApi.getIncremental(i)).to.be.a.number();
            Code.expect(stateApi.getIncremental(i)).to.be.within(1,99);            
        };
        done();
    });


});