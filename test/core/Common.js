Common = require('../../src/core/Common.js');
expect = require('chai').expect;

describe('Common', function () {

	describe('#keys()', function () {
		it('should return all keys', function () {
			test_object = {
				'a': false, 'b': 0, 'c': "", 'd': null, 'e': undefined, 'f': NaN,
				1: "trial"
			};
			test_object[-1] = "trial";

			expect(Common.keys(test_object)).to.have.all.members(
				['a','b','c','d','e','f','1','-1']
			);
		});
	});

	describe('#values()', function () {
		it('should return all values', function () {
			test_object = {
				'a': false, 'b': 0, 'c': "", 'd': null, 'e': undefined, 'f': NaN,
				1: "positive"
			};
			test_object[-1] = "negative";

			console.log(Common.values(test_object));

			expect(Common.values(test_object)).to.have.deep.members(
				[false,0,"",null,undefined,NaN,"positive","negative"]
			);
		});
	});

	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function() {
			// Basic test
			expect(Common.indexOf([0,1,2,3],4)).to.equal(-1);

			// Test falsy values
			expect(Common.indexOf( [     ,0,"",null,undefined,NaN], false     )).to.equal(-1);
			expect(Common.indexOf( [false, ,"",null,undefined,NaN], 0         )).to.equal(-1);
			expect(Common.indexOf( [false,0,  ,null,undefined,NaN], ""        )).to.equal(-1);
			expect(Common.indexOf( [false,0,"",    ,undefined,NaN], null      )).to.equal(-1);
			expect(Common.indexOf( [false,0,"",null,         ,NaN], undefined )).to.equal(-1);

			// Test thruthy values
			expect(Common.indexOf( [ ,true,"true"], 1      )).to.equal(-1);
			expect(Common.indexOf( [1,    ,"true"], true   )).to.equal(-1);
			expect(Common.indexOf( [1,true       ], "true" )).to.equal(-1);
		});

		it('should return an offset when the value is present', function() {
			// Basic test
			expect(Common.indexOf([0,1,2,3],4)).to.equal(-1);

			// Test falsy values
			expect(Common.indexOf( [false,0,"",null,undefined,NaN], false     )).to.equal(0);
			expect(Common.indexOf( [false,0,"",null,undefined,NaN], 0         )).to.equal(1);
			expect(Common.indexOf( [false,0,"",null,undefined,NaN], ""        )).to.equal(2);
			expect(Common.indexOf( [false,0,"",null,undefined,NaN], null      )).to.equal(3);
			expect(Common.indexOf( [false,0,"",null,undefined,NaN], undefined )).to.equal(4);

			// Test thruthy values
			expect(Common.indexOf( [1,true,"true"], 1      )).to.equal(0);
			expect(Common.indexOf( [1,true,"true"], true   )).to.equal(1);
			expect(Common.indexOf( [1,true,"true"], "true" )).to.equal(2);
		});

		it('should never return the index of NaN', function() {
			expect(Common.indexOf( [ NaN ], NaN )).to.equal(-1);
		});
	});
	
});
