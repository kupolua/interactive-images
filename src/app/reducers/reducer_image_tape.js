import _ from 'lodash';

const initialImagesListState = {
    model: {
        initialImageId: null,
        images: [],
        transitions: []
    },
    predicateSelectedImage: "",
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
            console.log(targetImageId)


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

    return state;
}

function addCondition(state, condition) {
    console.log(condition)

    // if(predicateState.predicate) {
    //     // console.log('if(predicateState.predicate)', state.condition)
    //     return {
    //         targetImageId: state.condition.targetImageId,
    //         predicate: predicateState.predicate
    //     }
    // }
    // if(predicateState.targetImageId) {
    //     // console.log('if(predicateState.targetImageId)', state.condition)
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
                if(value == updateCondition.currentProposedValue) {
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

function updateImageName(state, nextImage) {
    state.model.images.forEach((image, i, images) => {
        if(image.key == nextImage.image.key) {
            images[i].value.imageName = nextImage.nextImageName
        }
    })
}

export default function (state = initialImagesListState, action) {
    switch (action.type) {
        case 'ADD_IMAGE':

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

            // console.log(action.payload.selectedImage.key)

        return {
            ...state,
                predicateSelectedImage: action.payload.selectedImage.key
        };

        case 'SET_INITIAL_IMAGE':

            // console.log('SET_INITIAL_IMAGE', action.payload.initialImageId)

        // return {
        //     ...state,
        //     model: {
        //         initialImageId: action.payload.initialImageId
        //     }

            return {
                ...state,
                model: {
                    initialImageId: action.payload.initialImageId,
                    images: state.model.images,
                    transitions: state.model.transitions,
                }
            // };
        };

        case 'ADD_NEW_TRANSITION':

        return {
            ...state,
                model: {
                    initialImageId: action.payload.selectedImage.key,
                    images: [...state.model.images],
                    transitions: [
                        ...state.model.transitions, {
                            imageId: action.payload.selectedImage.key,
                            transitionQuestion: '',
                            proposition: {
                                type: '',
                                values: []
                            },
                            conditions: []
                        }
                    ]
                },
                predicateSelectedImage: action.payload.selectedImage.key
        };

        case 'ADD_TARGET_IMAGE':

            // let targetImage = addTargetImage(state, action.payload.targetImage);

            // console.log('targetImage', targetImage)

        return { ...state,  targetImageId: action.payload.targetImageId};

        case 'ADD_PREDICATE':

            // let condition = addCondition(state, action.payload.predicate);

            // console.log('condition', state.condition)

        return { ...state, predicate: action.payload.predicate };

        case 'UPDATE_PREDICATE':

            updatePredicate(state, action.payload);

        return { ...state };

        case 'UPDATE_IMAGE_NAME':

            updateImageName(state, action.payload);

            // console.log('UPDATE_IMAGE_NAME', state)

        return { ...state };

        case 'DELETE_CONDITION':

            deleteCondition(state, action.payload.condition);

        return { ...state };

        case 'ADD_TRANSITION_QUESTION':

            addTransitionQuestion(state, action.payload);
            // let transition = addTransition(state, action.payload);

        return { ...state };

        case 'SET_COURSE':

            // console.log('SET_COURSE', action.payload.course);
            // let transition = addTransition(state, action.payload);

        return { ...state, model: action.payload.course };
    }

    return state
}