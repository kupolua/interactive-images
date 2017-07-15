import { GET_COURSES_LIST } from '../actions/getCoursesList'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_COURSES_LIST:
            return { ...state, coursesList: JSON.parse(action.payload.data)};
    }

    return state
}