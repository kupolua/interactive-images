"use strict";

$(document).ready(function () {
    var FSM = new StateMachine({
        init: 'initial',
        transitions: [
            {name: 'healthy', from: '*', to: 'healthy'},
            {name: 'partly', from: '*', to: 'partly'},
            {name: 'unhealthy', from: '*', to: 'unhealthy'}
            // {name: 'reset', from: '*', to: 'initial'} //todo: do I need to add a reset button
        ],
        data: function (state) {
            return {
                setState: state
            }
        },
        methods: {
            onTransition: function(lifecycle) {
                $(".dns-state").hide();
                $("#" + lifecycle.to).show();
            }
        }
    });

    $("#next-button").click(function() {
        var selectedState = $("#states-list option:selected").val();

        FSM[selectedState]();
    });
});