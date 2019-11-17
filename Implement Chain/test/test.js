var chai = require('chai');
var expect = chai.expect;

var chain = require('../chain');

describe('done', function() {
	it('should return the result', () => {
    expect(chain(1).done()).to.equal(1);
  });

  it('should work non-sequentially', function () {
    let first = chain(1);
    let second = chain(2);
    expect(first.done()).to.equal(1);
    expect(second.done()).to.equal(2);
  });
});

describe('add', function() {
  it('should add a single value to the chained value', () => {
    expect(chain(1).add(1).done()).to.equal(2);
  });

  it('should add N values to the chained value', () => {
    expect(chain(1).add(1, 2, 3, 4, 5).done()).to.equal(16);
  });
});

describe('exec', function() {
  it('should replace the chained value with the result of executing the function argument', () => {
    expect(chain(2).exec(x => 10).done()).to.equal(10);
  });

  it('should pass the chained value to the function argument', () => {
    expect(chain(1).exec(x => x - 1).done()).to.equal(0);
  });
}); 

describe('mixin', function() {
  it('should add a new chainable method', () => {
    expect(function() {
      chain.substitute(5).done(); // 'substitute' should not exist before calling `mixin`
    }).to.throw();

    chain.mixin('substitute', (chainedVal, input) => input);
    expect(chain(9).substitute(5).done()).to.equal(5);
  });

  it('should add a new chainable method that accepts up to N arguments', () => {
    expect(function () {
      chain.substituteArgsCount(1, 2, 3).done(); // 'substituteArgsCount' should not exist before calling `mixin`
    }).to.throw();

    chain.mixin('substituteArgsCount', function(chainedVal, /* n0, n1, ... n */) {
      return arguments.length - 1;
    });
    expect(chain(101).substituteArgsCount(0).done()).to.equal(1);
    expect(chain(101).substituteArgsCount(0, 1).done()).to.equal(2);
    expect(chain(101).substituteArgsCount(1, 1, 2, 3, 5, 8, 13, 21, 34, 55).done()).to.equal(10);
  });
});

describe('additional requirements', function() {
  it('should not execute any callables until done is called', () => {
    expect(function() {
      chain(1).exec(x => { throw new Error('should not throw'); });
    }).to.not.throw();

    expect(function() {
      chain(5).exec(() => {throw new Error('should not throw'); }).done();
    }).to.throw();
  });

  it('should be immutable; each instance method should return a new chained object', () => {
    const _chain = chain(1);
    expect(_chain.add(2).done()).to.equal(3); // 3
    expect(_chain.add(10).done()).to.equal(11); // 11
  })
});