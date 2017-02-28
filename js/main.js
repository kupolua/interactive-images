"use strict";

$(document).ready(function () {
    var FSM = StateMachine.factory({
        init: 'initial',
        transitions: [
            {name: 'step', from: 'initial', to: 'healthy'},
            {name: 'step', from: 'initial', to: 'partly'},
            {name: 'step', from: 'initial', to: 'unhealthy'}
        ],
        data: function (state) {
            return {
                setState: state
            }
        },
        methods: {
            showState: function () {
                $("#" + this.setState).show();
            },
            resetState: function () {
                $(".dns-state").hide();
                $("input:radio").prop('checked', false);
            }
        }
    });

    var dnsState = {
        dns_initial_state: new FSM('dns_initial_state'),
        active_healthy: new FSM('active_healthy'),
        active_some_not_healthy: new FSM('active_some_not_healthy'),
        active_group_unhealthy: new FSM('active_group_unhealthy')
    };

    $("input:radio").change(function() {
        var id = $(this).val();

        if(this.checked) {
            dnsState[id].resetState();
            $(this).prop('checked', true);

            dnsState[id].state;
            dnsState[id].setState;
            dnsState[id].showState();
        }
    });
    $("#reset-control").click(function() {
        var id = "dns_initial_state";
        
        dnsState[id].resetState();

        dnsState[id].state;
        dnsState[id].setState;
        dnsState[id].showState();
    });
});