var fsm;

$(document).ready(function () {
    var number;
    var prevButton = document.getElementById("prevBtn");
    var nextButton = document.getElementById("nextBtn");
    var numberElement = document.getElementById("number");

    fsm = StateMachine.create({
        initial: 'one',
        events: [
            {name: 'next', from: 'one', to: 'two'},
            {name: 'evenNext', from: 'one', to: 'two'},
            {name: 'evenNext', from: ['two', 'three'], to: 'four'},
            {name: 'next', from: 'two', to: 'three'},
            {name: 'next', from: 'three', to: 'four'},
            {name: 'prev', from: 'four', to: 'three'},
            {name: 'evenPrev', from: ['four', 'three', 'two'], to: 'two'},
            {name: 'prev', from: 'three', to: 'two'},
            {name: 'prev', from: 'two', to: 'one'}
        ],
        callbacks: {
            onenterone: function (event, from, to) {
                number = 1;

                turnOffPrevButton();
            },
            onentertwo: function (event, from, to) {
                number = 2;

                turnOnAllButtons();
            },
            onenterthree: function (event, from, to) {
                number = 3;

                turnOnAllButtons();
            },
            onenterfour: function (event, from, to) {
                number = 4;

                turnOffNextButton();
            },
            onafterevent: function (event, from, to) {
                changeImg();
            }
        }
    });

    function changeImg() {
        numberElement.src = number.toString() + ".png";
    }

    function turnOnAllButtons() {
        turnOnPrevButton();
        turnOnNextButton();
    }

    function turnOnPrevButton() {
        prevButton.style.visibility = "visible";
    }

    function turnOnNextButton() {
        nextButton.style.visibility = "visible";
    }

    function turnOffPrevButton() {
        prevButton.style.visibility = "hidden";
    }

    function turnOffNextButton() {
        nextButton.style.visibility = "hidden";
    }
});

var fsmEvents = {
    checkboxState: function () {
        return document.getElementById("evenNumbersToggle").checked;
    },
    next: function () {
        if (this.checkboxState()) {
            fsm.evenNext();
        } else {
            fsm.next();
        }
    },
    previous: function () {
        if (this.checkboxState()) {
            fsm.evenPrev();
        } else {
            fsm.prev();
        }
    }

};