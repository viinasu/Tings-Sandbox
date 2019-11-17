let moreMethods = {};

function chain(initialValue) {
  return (function (initialValue) {
  	  let result = initialValue; 

	  let queue = [];

	  function done () {
	  	queue.forEach(item => {
	  		item();
	  	});
	  	let resultCopy = result;

	  	// reset 
	  	queue = [];
	  	result = initialValue;

	  	return resultCopy;
	  }

	  function add () {
	  	const args = Array.from(arguments);
	  	queue.push(function() {
	  		result = args.reduce((acc, val) => {
	  		return acc + val;
	  		}, result);	
	  	});
	  	return methods;
	  }

	  function exec () {
	  	const cb = arguments[0];

	  	queue.push(function () {	
	  		result = cb(result);
	  	});
	  	return methods;
	  }

	  let methods = {
		  	done,
		  	add,
		  	exec
		}	

		//add moreMethods (with modifications) to methods 
		Object.keys(moreMethods).forEach(newMethod => {
			methods[newMethod] = function () {
				const args = arguments;
				queue.push(function () {
					result = moreMethods[newMethod](result, ...args);	
				});
				return methods;
			}
		})
	  return methods;
  })(initialValue);
};

chain.mixin = function (name, cb) {
	moreMethods[name] = cb;
}

module.exports = chain;
