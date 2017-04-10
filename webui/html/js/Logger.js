"use strict";

function Logger() {
    var eventsList = [];

    return {
        log: function (event) {
            eventsList[eventsList.length] = eventsList.length + ' - ' + event;
        },
        getLogs: function () {
            return eventsList;
        }
    }
}