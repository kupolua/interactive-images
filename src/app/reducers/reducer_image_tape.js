import _ from 'lodash';

const initialImagesListState = {
    __model: {
        "initialImageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
        "images": [
            {
                "title": "",
                "key": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "value": {
                    "imageName": "smallfish",
                    "isBase64": false,
                    "imageSrc": "http://www.seobook.com/images/smallfish.jpg?refresh"
                }
            },
            {
                "title": "",
                "key": "b8f4b7e61246005c94949f665deb34a2",
                "value": {
                    "imageName": "diffbot",
                    "isBase64": false,
                    "imageSrc": "http://www.cs.cmu.edu/~robosoccer/image-gallery/small/2002/diffbot.jpg?refresh"
                }
            },
            {
                "title": "",
                "key": "f351cbdcc29ad663c1736112cac7f27a",
                "value": {
                    "imageName": "small_better_small",
                    "isBase64": false,
                    "imageSrc": "http://blogs.worldbank.org/africacan/files/africacan/small_better_small.jpg"
                }
            }
        ],
        "transitions": [
            {
                "imageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "transitionQuestion": {
                    "transitionQuestion": "next step",
                    "transitionQuestionImageId": "a4ac7cbc09f7f86b4ce24055763ecf07"
                },
                "proposition": {
                    "type": "OPEN_CHOICE",
                    "values": [
                        "to diffbot",
                        "to balls"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='to diffbot';}",
                        "targetImageId": "b8f4b7e61246005c94949f665deb34a2"
                    },
                    {
                        "predicate": "function(value){return value=='to balls';}",
                        "targetImageId": "f351cbdcc29ad663c1736112cac7f27a"
                    }
                ]
            },
            {
                "imageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "transitionQuestion": "",
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "b8f4b7e61246005c94949f665deb34a2"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "f351cbdcc29ad663c1736112cac7f27a"
                    }
                ]
            },
            {
                "imageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "transitionQuestion": {
                    "transitionQuestion": "Input value",
                    "transitionQuestionImageId": "a4ac7cbc09f7f86b4ce24055763ecf07"
                },
                "proposition": {
                    "type": "CUSTOM_PREDICATE",
                    "values": [
                        " to bot",
                        "m"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function isBot(value){if(value == \"bot\"){return true}else{return false}}",
                        "targetImageId": "b8f4b7e61246005c94949f665deb34a2"
                    },
                    {
                        "predicate": "function isEven(value){if(value % 2 == 0){return true}else{return false}}",
                        "targetImageId": "f351cbdcc29ad663c1736112cac7f27a"
                    }
                ]
            }
        ]
    },
    model: {
        initialImageId: null,
        images: [],
        transitions: []
    },
    _license_model: {
        initialImageId: null,
        images: [
            {
                "title": "",
                "key": "462f36f68b4389aa332aebc6050680fa",
                "value": {
                    "imageName": "Derivative work under Same license",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/hFTqPb/Derivative_work_under_Same_license.png"
                }
            },
            {
                "title": "",
                "key": "eaa7aaec3e0e0f916d807eb3c5641b68",
                "value": {
                    "imageName": "Link to code under another license and distribute",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/mpGYcw/Link_to_code_under_another_license_and_distribute.png"
                }
            },
            {
                "title": "",
                "key": "bd8e2fded50c994d567ed198515776af",
                "value": {
                    "imageName": "Files must contain all info about changes patents copyright",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/nQteHw/Files_must_contain_all_info_about_changes_patents_copyright.png"
                }
            },
            {
                "title": "",
                "key": "d052ce57150eb12ec2348034f5b3caf9",
                "value": {
                    "imageName": "Can bring claims against users",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/bRwc4b/Can_bring_claims_against_users.png"
                }
            },
            {
                "title": "",
                "key": "b760a562bbe30ab60918f33ab5b1e365",
                "value": {
                    "imageName": "Can use brand for promotion",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/hUMAPb/Can_use_brand_for_promotion.png"
                }
            },
            {
                "title": "",
                "key": "6a6535f474720dfab0d9c87056fccaa9",
                "value": {
                    "imageName": "LGPL 2",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/cuYDcw/LGPL_2.png"
                }
            },
            {
                "title": "",
                "key": "a395b95f7da340029828f94d2a9631a2",
                "value": {
                    "imageName": "LGPL 3",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/n5uaqG/LGPL_3.png"
                }
            },
            {
                "title": "",
                "key": "9dfee3a2af7d23817caf74f8f646cb5a",
                "value": {
                    "imageName": "GPL 2",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/dvfgVG/GPL_2.png"
                }
            },
            {
                "title": "",
                "key": "04361625649911f8fabb1675e6f90469",
                "value": {
                    "imageName": "GPL 3",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/muuKHw/GPL_3.png"
                }
            },
            {
                "title": "",
                "key": "61c6e2763c52019bc5544caac35f4478",
                "value": {
                    "imageName": "Apache 2 0",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/dL7TAG/Apache_2_0.png"
                }
            },
            {
                "title": "",
                "key": "c0cd21138cb5b344351d090ca67f2dd8",
                "value": {
                    "imageName": "MIT",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/itagVG/MIT.png"
                }
            },
            {
                "title": "",
                "key": "e3ddba12dc04f9cc6332ee9f8e7194fa",
                "value": {
                    "imageName": "BSD",
                    "isBase64": false,
                    "imageSrc": "https://image.ibb.co/fOpaqG/BSD.png"
                }
            }
        ],
        transitions: [
            {
                "imageId": "462f36f68b4389aa332aebc6050680fa",
                "transitionQuestion": {
                    "transitionQuestion": "Derivative work under Same license?",
                    "transitionQuestionImageId": "462f36f68b4389aa332aebc6050680fa"
                },
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "eaa7aaec3e0e0f916d807eb3c5641b68"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "bd8e2fded50c994d567ed198515776af"
                    }
                ]
            },
            {
                "imageId": "eaa7aaec3e0e0f916d807eb3c5641b68",
                "transitionQuestion": {
                    "transitionQuestion": "Link to code under another license and distribute?",
                    "transitionQuestionImageId": "eaa7aaec3e0e0f916d807eb3c5641b68"
                },
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "d052ce57150eb12ec2348034f5b3caf9"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "b760a562bbe30ab60918f33ab5b1e365"
                    }
                ]
            },
            {
                "imageId": "d052ce57150eb12ec2348034f5b3caf9",
                "transitionQuestion": {
                    "transitionQuestion": "Can bring claims against users?",
                    "transitionQuestionImageId": "d052ce57150eb12ec2348034f5b3caf9"
                },
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "a395b95f7da340029828f94d2a9631a2"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "6a6535f474720dfab0d9c87056fccaa9"
                    }
                ]
            },
            {
                "imageId": "bd8e2fded50c994d567ed198515776af",
                "transitionQuestion": {
                    "transitionQuestion": "Files must contain all info about changes patents copyright?",
                    "transitionQuestionImageId": "bd8e2fded50c994d567ed198515776af"
                },
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "61c6e2763c52019bc5544caac35f4478"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "b760a562bbe30ab60918f33ab5b1e365"
                    }
                ]
            },
            {
                "imageId": "b760a562bbe30ab60918f33ab5b1e365",
                "transitionQuestion": {
                    "transitionQuestion": "Can use brand for promotion?",
                    "transitionQuestionImageId": "b760a562bbe30ab60918f33ab5b1e365"
                },
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "c0cd21138cb5b344351d090ca67f2dd8"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "e3ddba12dc04f9cc6332ee9f8e7194fa"
                    }
                ]
            }
        ]
    },
    _model: {
        // "initialImageId": null,
        "initialImageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
        "images": [
            {
                "title": "",
                "key": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "value": {
                    "imageName": "smallfish",
                    "isBase64": false,
                    "imageSrc": "http://www.seobook.com/images/smallfish.jpg?refresh"
                }
            },
            {
                "title": "",
                "key": "b8f4b7e61246005c94949f665deb34a2",
                "value": {
                    "imageName": "diffbot",
                    "isBase64": false,
                    "imageSrc": "http://www.cs.cmu.edu/~robosoccer/image-gallery/small/2002/diffbot.jpg?refresh"
                }
            },
            {
                "title": "",
                "key": "f351cbdcc29ad663c1736112cac7f27a",
                "value": {
                    "imageName": "small_better_small",
                    "isBase64": false,
                    "imageSrc": "http://blogs.worldbank.org/africacan/files/africacan/small_better_small.jpg"
                }
            }
        ],
        "transitions": [
            {
                "imageId": "b8f4b7e61246005c94949f665deb34a2",
                "transitionQuestion": "f",
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "a4ac7cbc09f7f86b4ce24055763ecf07"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "f351cbdcc29ad663c1736112cac7f27a"
                    }
                ]
            },
            {
                "imageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "transitionQuestion": "d",
                "proposition": {
                    "type": "YES_NO",
                    "values": [
                        "YES",
                        "NO"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='YES';}",
                        "targetImageId": "b8f4b7e61246005c94949f665deb34a2"
                    },
                    {
                        "predicate": "function(value){return value=='NO';}",
                        "targetImageId": "f351cbdcc29ad663c1736112cac7f27a"
                    }
                ]
            },
            {
                "imageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "transitionQuestion": "d",
                "proposition": {
                    "type": "OPEN_CHOICE",
                    "values": [
                        "d"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(value){return value=='d';}",
                        "targetImageId": "b8f4b7e61246005c94949f665deb34a2"
                    }
                ]
            },
            {
                "imageId": "a4ac7cbc09f7f86b4ce24055763ecf07",
                "transitionQuestion": "d",
                "proposition": {
                    "type": "CUSTOM_PREDICATE",
                    "values": [
                        "to bot"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(e){return e==\"1\" || false}",
                        "targetImageId": "b8f4b7e61246005c94949f665deb34a2"
                    }
                ]
            },
            {
                "imageId": "b8f4b7e61246005c94949f665deb34a2",
                "transitionQuestion": "f",
                "proposition": {
                    "type": "CUSTOM_PREDICATE",
                    "values": [
                        "to fish"
                    ]
                },
                "conditions": [
                    {
                        "predicate": "function(e){return e==\"1\" || false}",
                        "targetImageId": "a4ac7cbc09f7f86b4ce24055763ecf07"
                    }
                ]
            }
        ]
    },
    predicateSelectedImage: null,
    _predicateSelectedImage: "a4ac7cbc09f7f86b4ce24055763ecf07",
    transitionQuestion: '',
    targetImageId: null,
    predicate: null,
    transition: null
};
const MAX_REMOVED_ITEMS = 1;

function removeImage(state, imageKey) {
    state.model.images.forEach(function (image, i, images) {
       if(image.key == imageKey) {
           images.splice(i, MAX_REMOVED_ITEMS);
       }
    });
}

function removeTransition(state, imageKey) {
    state.model.transitions.forEach((transition, i, transitions) => {
        if(transition.imageId == imageKey) {
            transitions.splice(i, MAX_REMOVED_ITEMS)
        }
    })
}

function removeConditions(state, imageKey) {
    state.model.transitions.forEach((transition) => {
        transition.conditions.forEach((condition, i, conditions) => {
            if(condition.targetImageId == imageKey) {
                removeProposition(transition.proposition, condition.predicate);
                
                conditions.splice(i, MAX_REMOVED_ITEMS)
            }
        })
    })
}

function removeProposition(propositions, predicate) {
    let propositionValue = predicate.replace(/^.*=='/, "").replace(/'.*$/, "");

    propositions.values.forEach((value, i, values) => {
        if(value == propositionValue) {
            values.splice(i, MAX_REMOVED_ITEMS)
        }
    })
}

function isSetCondition(conditions, condition) {
    let isSet = false;

    conditions.forEach(function (item) {
        if(_.isEqual(item, condition)) {
            isSet = true;
        }
    });

    return isSet;
}

function isSetTransition(transitions, transition) {
    let isSet = false;

    transitions.forEach(function (item) {
        if(item.imageId == transition.imageId) {
            isSet = true;
        }
    });

    return isSet;
}

function addTargetImage(state, targetImageId) {
            // console.log(targetImageId)


    // state.model.transitions.forEach(function (item) {
    //     if(item.imageId == state.predicateSelectedImage) {
    //
    //     }
    //     //     state.model.targetImageId = image.key;
        //     let condition = {
        //         targetImageId: image.key
        //     };
        //
        //     if(!isSetCondition(item.conditions, condition)) {
        //         item.conditions.push(condition);
        //     }
        // }
    // });

    return state;
}

function addTransitionQuestion(state, transitionQuestion) {
    // // console.log('function addTransitionQuestion(state, transitionQuestion) {', transitionQuestion);
    if(state.model.transitions.length < 1) {
        state.transitionQuestion = transitionQuestion.transitionQuestion
    }

    state.model.transitions.map((transition) => {
        if(state.predicateSelectedImage == transition.imageId) {
            transition.transitionQuestion = transitionQuestion.transitionQuestion
        } else {
            state.transitionQuestion = transitionQuestion.transitionQuestion
        }
    });

    // // console.log('function addTransitionQuestion(state, transitionQuestion) {, state', state);
    return state;
}

function addCondition(state, condition) {
    // console.log(condition)

    // if(predicateState.predicate) {
    //     // // console.log('if(predicateState.predicate)', state.condition)
    //     return {
    //         targetImageId: state.condition.targetImageId,
    //         predicate: predicateState.predicate
    //     }
    // }
    // if(predicateState.targetImageId) {
    //     // // console.log('if(predicateState.targetImageId)', state.condition)
    //     return {
    //         targetImageId: predicateState.targetImageId,
    //         predicate: state.condition.predicate
    //     }
    // }
}

function deleteProposition(proposition, deleteCondition) {
    proposition.values.forEach((value, i, values) => {
        if(value == deleteCondition.predicate) {
            values.splice(i, MAX_REMOVED_ITEMS);
        }
    });
}

function deleteCondition(state, deleteCondition) {
    state.model.transitions.map((transition) => {
        if(state.predicateSelectedImage == transition.imageId) {
            transition.conditions.forEach((condition, i, conditions) => {
                if(_.isEqual(condition, deleteCondition)) {
                    conditions.splice(i, MAX_REMOVED_ITEMS);

                    deleteProposition(transition.proposition, deleteCondition);

                    return conditions;
                }
            });
        }
    });

    state.model.transitions.forEach((transition, i, transitions) => {
        if(transition.conditions.length < 1) {
            transitions.splice(i, MAX_REMOVED_ITEMS);
            state.model.initialImageId = null;
            state.transitionQuestion = '';
        }
    });
}

function updatePredicate(state, updateCondition) {
    state.model.transitions.map((transition) => {
        if(state.predicateSelectedImage == transition.imageId) {
            transition.proposition.values.forEach((value, i, values) => {
                // console.log('if(value == updateCondition.currentProposedValue) {', value, updateCondition.currentProposedValue);
                if(value == updateCondition.currentProposedValue) {
                    // // console.log('values[i] = updateCondition.proposedValue', values[i], updateCondition.proposedValue);
                    values[i] = updateCondition.proposedValue
                }
            });

            transition.conditions.forEach((condition) => {
                if(_.isEqual(condition, updateCondition.condition)) {
                    condition.predicate = 'function(value){return value==\'' + updateCondition.proposedValue + '\';}';
                }
            });
        }
    })
}

function updatePredicateCode(state, predicateCode) {
    state.model.transitions.map((transition) => {
        if(state.predicateSelectedImage == transition.imageId) {
            transition.conditions.forEach((condition, i, conditions) => {
                if(condition.targetImageId == predicateCode.targetImageId) {
                    // console.log(predicateCode.predicate);
                    condition.predicate = predicateCode.predicate;
                }
            });
        }
    })
}

function updateCondition(state, nextCondition) {

    state.model.transitions.map((transition) => {
       if(transition.proposition.type == state.tabValue) {
           transition.conditions[0].predicate = nextCondition.predicateCode;  //todo: implement search by proposition.values
       }
    });

    // // console.log(
    //     'nextCondition', nextCondition,
    //     '\nstate', state
    // );
    
}

function updateImageName(state, nextImage) {
    state.model.images.forEach((image, i, images) => {
        if(image.key == nextImage.image.key) {
            images[i].value.imageName = nextImage.nextImageName
        }
    })
}

function isPropositionValue(propositions, value) {
    let isPropositionValue = false;

    propositions.map((proposition) => {
        if(proposition == value) {
            isPropositionValue = true;
        }
    });

    return isPropositionValue;
}

function isTransition(state, type) {
    let isTransition = false;

    state.model.transitions.map((transition) => {
        if(transition.proposition.type == type) {
            isTransition = true;
        }
    });

    return isTransition;
}

function isTransitionStored(state, nextTransition) {
    let isTransitionStored = false;

    state.model.transitions.map((transition) => {
        // // console.log('function isTransitionStored(state, imageId) {', transition, nextTransition);
        if(transition.imageId == nextTransition.imageId) {
            if(transition.proposition.type == nextTransition.proposition.type) {
                isTransitionStored = true;
            }
        }
    });

    // // console.log('function isTransitionStored(state, imageId) {', isTransitionStored);
    return isTransitionStored;
}

function addTransition(state, nextTransition) {
    // console.log('addTransition(state, nextTransition) {, state, nextTransition', state, nextTransition);
    if(state.model.transitions.length < 1) {
        state.model.transitions.push(nextTransition);

        state.targetComponentValue = '';

        return;
    }

    state.model.transitions.map((transition) => {
        // console.log('map::if(isTransition(state, nextTransition.proposition.type)) {', nextTransition.proposition.type);
        if(isTransition(state, nextTransition.proposition.type)) {
            // console.log('true');
            // console.log('if(transition.proposition.type == nextTransition.proposition.type) {', transition.proposition.type, nextTransition.proposition.type);
            if(transition.proposition.type == nextTransition.proposition.type) {
                    // console.log('!!!true');
                    // console.log('if (transition.imageId == nextTransition.imageId) {', transition.imageId, nextTransition.imageId);
                if (transition.imageId == nextTransition.imageId) {
                    // console.log('true');
                    // console.log('if (!isPropositionValue(transition.proposition.values, nextTransition.proposition.values[0])) {');
                    if (!isPropositionValue(transition.proposition.values, nextTransition.proposition.values[0])) {
                        transition.proposition.values.push(nextTransition.proposition.values[0]);
                        transition.conditions.push(nextTransition.conditions[0])
                        // console.log('true');
                    } else {
                        transition.proposition.values.forEach((value, i) => {
                            if (value == nextTransition.proposition.values[0]) {
                                transition.conditions[i] = nextTransition.conditions[0];
                            }
                        })
                        // console.log('false');
                    }
                } else {
                    // console.log('false');
                    // console.log('if(!isTransitionStored(state, nextTransition.imageId)) {', state, nextTransition.imageId);
                    if(!isTransitionStored(state, nextTransition)) {
                        // console.log('true');
                        state.model.transitions.push(nextTransition);
                    }
                }
            }
        } else {
            // console.log('false');
            state.model.transitions.push(nextTransition);
        }
    });

    state.targetComponentValue = '';
}

export default function (state = initialImagesListState, action) {
    switch (action.type) {
        case 'ADD_IMAGE':
        // // console.log('case \'ADD_IMAGE\':');
        return {
            ...state,
            model: {
                initialImageId: state.model.initialImageId,
                images: [
                    ...state.model.images, {
                        title: '',
                        key: action.payload.key,
                        value: {
                            imageName: action.payload.imageName,
                            isBase64: action.payload.src.match("/base64/") ? true : false,
                            imageSrc: action.payload.src
                        }
                    }
                ],
                transitions: state.model.transitions
            }
        };

        case 'IMAGE_REMOVE':

            removeImage(state, action.payload.imageKey);
            removeTransition(state, action.payload.imageKey);
            removeConditions(state, action.payload.imageKey);

            return { ...state };

        case 'SET_SELECTED_IMAGE':

            // // console.log(action.payload.selectedImage.key);

        return {
            ...state,
                predicateSelectedImage: action.payload.selectedImage.key
        };

        case 'SET_INITIAL_IMAGE':

            console.log('SET_INITIAL_IMAGE', state, action.payload)

        // return {
        //     ...state,
        //     model: {
        //         initialImageId: action.payload.initialImageId
        //     }

            // state.model = {
            //     initialImageId: action.payload.initialImageId,
            //     images: state.model.images,
            //     transitions: state.model.transitions,
            // };

            // state.tabValue = action.payload.tabValue;
            // console.log('state.tabValue', state.tabValue);

            return {
                ...state,
                model: {
                    initialImageId: action.payload.initialImageId,
                    images: state.model.images,
                    transitions: state.model.transitions,
                }
            // };
        };

        case 'ADD_TRANSITION':


            addTransition(state, action.payload);

        return { ...state };
        // return {
        //     ...state,
        //         model: {
        //             initialImageId: action.payload.selectedImage.key,
        //             images: [...state.model.images],
        //             transitions: [
        //                 ...state.model.transitions, {
        //                     imageId: action.payload.selectedImage.key,
        //                     transitionQuestion: '',
        //                     proposition: {
        //                         type: '',
        //                         values: []
        //                     },
        //                     conditions: []
        //                 }
        //             ]
        //         },
        //         predicateSelectedImage: action.payload.selectedImage.key
        // };

        case 'ADD_TARGET_IMAGE':

            // let targetImage = addTargetImage(state, action.payload.targetImage);

            // // console.log('reducer_image_tape::ADD_TARGET_IMAGE::, action.payload', action.payload)
            // // console.log('reducer_image_tape::ADD_TARGET_IMAGE::, state', state)

        return { ...state,
            targetImageId: action.payload.targetImageId,
            targetComponentId: action.payload.targetComponentValue,
            targetComponentValue: action.payload.targetComponentValue == "YES" ? "YES" : "NO",
            targetComponentTrueId: action.payload.targetComponentValue == "YES" ? action.payload.targetImageId : state.targetComponentTrueId,
            targetComponentFalseId: action.payload.targetComponentValue == "NO" ? action.payload.targetImageId : state.targetComponentFalseId
        };

        case 'ADD_PREDICATE':

            // let condition = addCondition(state, action.payload.predicate);

            // // console.log('case ADD_PREDICATE:, predicate', action.payload)

        return { ...state, predicate: action.payload.predicate };

        case 'UPDATE_PREDICATE':

            // // console.log('case \'UPDATE_PREDICATE\':')

            updatePredicate(state, action.payload);

        return { ...state };

        case 'UPDATE_PREDICATE_CODE':


            updatePredicateCode(state, action.payload);

            // // console.log('case \'UPDATE_PREDICATE_CODE\':', state)

        return { ...state };

        case 'UPDATE_CONDITION':

            // // console.log('case \'UPDATE_CONDITION\':')

            updateCondition(state, action.payload);

        return { ...state };

        case 'UPDATE_IMAGE_NAME':
            // // console.log('UPDATE_IMAGE_NAME', state)

            updateImageName(state, action.payload);


        return { ...state };

        case 'DELETE_CONDITION':

            deleteCondition(state, action.payload.condition);

        return { ...state };

        case 'ADD_TRANSITION_QUESTION':
            // // console.log('case \'ADD_TRANSITION_QUESTION\':');

            addTransitionQuestion(state, action.payload);
            // let transition = addTransition(state, action.payload);

        return { ...state };

        case 'SET_COURSE':

        return { ...state, model: action.payload.course };

        case 'SET_TAB_VALUE':

        return { ...state, tabValue: action.payload.tabValue };

        case 'SET_PROPOSED_VALUE':

        return { ...state, targetComponentValue: action.payload.targetComponentValue };

        case 'SET_OPEN_CHOICE_VALUE':

        return { ...state, openChoiceValue: action.payload.openChoiceValue };
    }

    return state
}