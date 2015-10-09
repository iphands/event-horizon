/*global require, describe, it, console, setTimeout*/
'use strict';

var assert  = require('assert'),
    horizon = require('./event-horizon');

function loop (max, t, i, eaten, run) {
    for (i = 0; i < max; i += 1) {
        t.run(function () {
            run();
        }, function () {
            eaten();
        });
    }
}

describe('Event-Horizon', function () {
    it('should eat things that happen too fast', function () {
        var t     = horizon.instance({ window: 1000, max: 5 }),
            run   = 0,
            eaten = 0,
            i     = 0;

        loop(100, t, i, function () {eaten += 1;}, function () { run += 1; });
        assert.equal(5, run);
        assert.equal(95, eaten);
    });

    it('should reset when I go over window', function (done) {
        var t     = horizon.instance({ window: 10, max: 10 }),
            run   = 0,
            eaten = 0,
            i     = 0;

        this.timeout(500);

        loop(100, t, i, function () {eaten += 1;}, function () { run += 1; });
        setTimeout(function () {
            loop(100, t, i, function () {eaten += 1;}, function () { run += 1; });
            setTimeout(function () {
                loop(100, t, i, function () {eaten += 1;}, function () { run += 1; });
                assert.equal(30, run);
                assert.equal(270, eaten);
                done();
            }, 11);
        }, 11);
    });
});