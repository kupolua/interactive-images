
var FSM = new StateMachine({
    init: transitions[0].name,
    transitions: transitions,
    methods: {
        onTransition: function(lifecycle) {
            $(".state").hide();
            $("#" + lifecycle.to).show();
        },
        onReset: function (lifecycle) {
            $(".state").hide();
            $("#" + lifecycle.to).show();
        },
        onAfterReset: function (lifecycle) {
            $("#reset-button").hide();
            $("#state-select").show();
            $("#states-list").val(lifecycle.to);
        }
    }
});

function Navigation() {
    var nextButton = $("#next-button").click(function() {
        try {
            var selectedState = $("#states-list option:selected").val();

            FSM[selectedState]();

            $("#state-select").hide();
            $("#reset-button").show();
        }
        catch(e) {
            alert("Select state, please");
        }
    });
    var resetButton = $("#reset-button").click(function() {
        FSM.reset();
    });

    return {
        nextButton: function () {
            nextButton();
        },
        resetButton: function () {
            resetButton();
        }
    }
}