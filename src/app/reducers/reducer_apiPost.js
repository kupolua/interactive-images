import { GET_COURSE } from '../actions/getCourse'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_COURSE:
            return { ...state, course: action.payload.data};
    }

    return state
}