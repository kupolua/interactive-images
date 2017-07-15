import { UPLOAD_COURSE } from '../actions/storeCourse';

export default function (state = {}, action) {
    switch (action.type) {
        case UPLOAD_COURSE:
            return { ...state, storedCourseId: action.payload.data};
    }

    return state
}