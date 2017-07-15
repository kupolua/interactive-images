import axios from 'axios';

const API_URL = 'https://5y0zlkijgc.execute-api.us-east-1.amazonaws.com/dev';

export const GET_COURSES_LIST = 'GET_COURSES_LIST';

export function getCoursesList() {
    const coursesList = axios.get(API_URL);

    return {
        type: GET_COURSES_LIST,
        payload: coursesList
    }
}

