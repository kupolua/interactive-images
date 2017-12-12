export default function (state = null, action) {
    switch (action.type) {
    case 'IMAGE_SELECTED':
        // console.log('case \'IMAGE_SELECTED\':', action.payload);
        return action.payload
    }

    return state
}