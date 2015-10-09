# event-horizon

Eats things that happen too many times per time window.
A time window in this case is an interval window, not a sliding window.


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
