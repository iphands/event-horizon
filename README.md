<p align="center"><img height="211px" src="https://cloud.githubusercontent.com/assets/129737/10387928/6992de24-6e33-11e5-8d38-a9bd5dd7778f.png"></p>


# event-horizon

[npm-url]: https://npmjs.org/package/event-horizon
[downloads-image]: http://img.shields.io/npm/dm/event-horizon.svg
[npm-image]: http://img.shields.io/npm/v/event-horizon.svg
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Eats things that happen too many times per time window.
A time window in this case is a sliding window.

# Example

## Simple

```javascript
var horizon = require('event-horizon').instance({window: 200, max: 50});
horizon.run(function () {
    request(...);
});
```

## With a callback

```javascript
var horizon = require('event-horizon').instance({window: 200, max: 50});
horizon.run(function () {
    request(...);
}, function () {
    deferred.reject();
});
```
