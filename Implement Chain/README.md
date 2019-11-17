## Chaining in JavaScript
 
Write and export a JavaScript function, `chain`, that takes as input a single number, and returns an object on which a variety of methods can be called (described below). Implement each of these methods.

## done()

Return the final accumulated value.

 ```javascript
 chain(1).done(); // 1
 ```

## add(n0, n1, ...)
 
Add one or more numbers to the chained value.

 ```javascript
 chain(1).add(2).done(); // 3
 chain(3).add(4, 5).done(); // 12
 ```

 ## exec(fn)
 
 Call a function that takes the current chained value as input, and returns a new value that replaces the chained value.
 
 ```javascript
chain(1).exec(x => x).done(); // 1
chain(2).exec(x => x - 2).done(); // 0
 ```

 ## chain.mixin(name, fn)
 
 Add a new chainable method to objects returned by `chain()`.

```javascript
chain.mixin('substitute', (current, x) => x);
chain(0).substitute(10).add(1).done(); // 11
```

`mixin` accepts a function whose _first_ parameter is the current chained value (`current` in the example above), and its subsequent parameters are values that are passed from the chainable method that is created as a result of calling `mixin` (`x` is `10` in the example above). The value returned from this function becomes the new chained value.

**Note**: `mixin` is a function defined on `chain` itself.

## Additional Requirements

All callable methods (including mixed-in methods) should not execute until the `done()` method is called.
 
```javascript
chain(1).exec(() => { throw new Error() }); // nothing happens
chain(1).exec(() => { throw new Error() }).done(); // exception is thrown
```

The object returned by chain and any instance methods should be immutable.

```javascript
const _chain = chain(1);
_chain.add(2).done(); // 3
_chain.add(10).done(); // 11
```

## Considerations

* This exercise is scored out of 10 (1 point for each test case that passes, see `test/test.js`).
* It's better to have a partial working solution than one that attempts the harder parts of this challenge but fails to compile.
* If you're finding a part of the exercise challenging, consider tackling a different requirement first, then coming back.

 ## Exporting
 
 To submit your results, export the function like so:
 
 ```javascript
 module.exports = chain;
```
