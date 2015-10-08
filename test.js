/*global require, describe, it, console*/
'use strict';

var assert  = require('assert'),
    horizon = require('./event-horizon');

describe('Event-Horizon', function () {
    it('should eat things that happen too fast', function () {
        var t     = horizon.instance({ window: 1000, max: 5 }),
            run   = 0,
            eaten = 0,
            i     = 0;

        for (i = 1; i < 101; i += 1) {
            t.run(function () {
                console.log('test' + i);
                run += 1;
            }, function () {
                eaten += 1;
            });
        }

        assert.equal(4, run);
        assert.equal(96, eaten);
    });
});