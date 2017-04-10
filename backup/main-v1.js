"use strict";

// var imageTransitionMap = Map({{
//     key: {
//         imageId = 'some_image_id_like_adsfe4345',
//             imageName: 'my initial image name',
//             imageBase64: 'image in base64 ...'
//     },
//     value: {
//         transitionName: 'choose current DNS active group state'
//         proposition: {
//             type: 'FIXED_CHOICE', // other options like 'ANY_STRING', "ANY NUMBER", "ANY INTEGER", "TRUE_FALSE"
//                 values: ['all in active group healthy', 'some in active group healthy', 'active group unhealthy']
//         },
//         conditions: [{
//             predicate: function(value){return value=='all in active group healthy'},
//             targetImageId: 'some_image_id_like_adsfe4345'
//         }, {
//             predicate: function(value){return value=='some in active group healthy'},
//             targetImageId: 'some_image_id_like_adsfe4345'
//         }...]
//     },
//     key: {
//         imageId = 'some_image_id_like_adsfe4345',
//             imageName: 'all healthy',
//             imageBase64: 'image in base64 ...'
//     },
//     value : null
//
//     { other image key, value}
// });

//transitions: key: imageId, value = transition

var initialImageId = 'eae5a21facf34818855397eba0567c57';
var transitions = [];

var images = [
    {
        key: 'eae5a21facf34818855397eba0567c57',
        value: {
            imageName: 'dns_initial_state',
            imageBase64: ''
        }
    },
    {
        key: "42fd652c010d44398f50bb7b58d60bb6",
        value: {
            imageName: 'active_healthy',
            imageBase64: ''
        }
    },
    {
        key: "2da40be55b644a91adc9ae08a32abf71",
        value: {
            imageName: 'active_some_not_healthy',
            imageBase64: ''
        }
    },
    {
        key: "523e32dc43344eb79c0292705bc0d940",
        value: {
            imageName: 'active_group_unhealthy',
            imageBase64: ''
        }
    }
];

var imageTransitionMap = {
    image: {
        id: 'some_image_id_like_adsfe4345',
        name: 'my initial image name'
    },
    transition: {
        name: 'choose current DNS active group state',
        proposition: {
            type: 'FIXED_CHOICE',
            values: ['dns initial state', 'all in active group healthy', 'some in active group healthy', 'active group unhealthy']
        },
        conditions: [
            {
                predicate: function(value){
                    return value == 'dns initial state';
                },
                targetImageId: 'eae5a21facf34818855397eba0567c57'
            },
            {
                predicate: function(value){
                    return value == 'all in active group healthy';
                },
                targetImageId: '42fd652c010d44398f50bb7b58d60bb6'
            },
            {
                predicate: function(value){
                    return value == 'some in active group healthy';
                },
                targetImageId: '2da40be55b644a91adc9ae08a32abf71'
            },
            {
                predicate: function(value){
                    return value == 'active group unhealthy';
                },
                targetImageId: '523e32dc43344eb79c0292705bc0d940'
            }
        ]
    }
};

imageTransitionMap.transition.proposition.values.forEach(function(val) {
    imageTransitionMap.transition.conditions.forEach(function (item, i, arr) {
       if(item.predicate(val)) {
           transitions.push({ name: item.targetImageId, from: initialImageId, to: item.targetImageId, description: val });
       }
    });
});
transitions.push({name: 'reset', from: '*', to: initialImageId, description: 'dns initial state' });

$(document).ready(function () {
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

    $("#next-button").click(function() {
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

    $("#reset-button").click(function() {
        FSM.reset();
    });
});