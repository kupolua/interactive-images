"use strict";

function NetworkTransporter() {
    this.send = function(request) {
        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open(request.type, request.url, true);
            xhr.responseType = 'json';

            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });
    }
}