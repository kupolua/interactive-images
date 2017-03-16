"use strict";

function ComponentListener() {
    this.target = '';
    this.type = '';
    this.callback = {};

    (function() {
        this.setTarget = function(target) {
            this.target = target;

            return this;
        };
        this.setType = function(type) {
            this.type = type;

            return this;
        };
        this.setCallback = function(callback) {
            this.callback = callback;

            return this;
        };
        this.add = function() {
            var callback = this.callback;
            try {
                this.target.addEventListener(this.type, function() {
                    callback();
                });
            } catch (e) {
                logger.log('error to set Listener: ' + e);
            }

            return this;
        }
    }).call(ComponentListener.prototype);
}