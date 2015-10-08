/*global require, describe, it, console*/
'use strict';

var assert  = require('assert'),
    horizon = require('./event-horizon');

describe('Event-Horizon', function () {
    it('should eat things that happen too fast', function () {
        var t = horizon.instance({ window: 1000, max: 5 }),
            c = 0,
            i = 0;

        for (i = 1; i < 100; i += 1) {
            t.run(function () {
                console.log('test' + i);
                c += 1;
            });
        }

        assert.equal(4, c);
    });
});