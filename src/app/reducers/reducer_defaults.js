const initialDefaults = {
    hintText: 'paste URL name',
    value: '',
    proposedHintText: 'enter proposed value',
    transitionQuestionHintText: 'enter transition question',
    proposedValue: '',
    targetImageId: '',
    model: {
        initialImageId: null,
        images: [
            {
                title: '',
                key: '',
                value: {
                    imageName: '',
                    isBase64: '',
                    imageSrc: ''
                }
            }
        ],
        transitions: [
            {
                imageId: '',
                transitionQuestion: '',
                proposition: {
                    type: '',
                    values: []
                },
                conditions: [
                    {
                        predicate: '',
                        targetImageId: ''
                    }
                ]
            }
        ]
    }
};

export default function (state = initialDefaults, action) {
    switch (action.type) {
        case 'SET_DEFAULTS':
            state = initialDefaults;

            return { ...state };

        case 'SET_INPUT_DATA':
            state = action.payload;

            return state
    }

    return state
}