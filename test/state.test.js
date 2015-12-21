const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const state = require('../server/state');

lab.test('advanceToken is false when last called is equal last given', (done) => {
    Code.expect(state.advanceToken()).to.equal(false);
    done();
});

lab.test('getNewToken starts from 1', (done) => {
    Code.expect(state.getNewToken(1)).to.equal(1);
    done();
});

lab.test('advanceToken defaults to desk 1 when no desk number is passed', (done) => {
    state.advanceToken();   
    var desks =  state.getDesks();

    Code.expect(desks).to.be.an.object();
    Code.expect(desks['1']).to.equal(state.getLastCalledToken());
    state.advanceToken();   
    Code.expect(desks['1']).to.equal(state.getLastCalledToken());
    done();
});
