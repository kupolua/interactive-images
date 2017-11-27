import axios from 'axios';

const API_URL = 'https://5y0zlkijgc.execute-api.us-east-1.amazonaws.com/dev';

export const UPLOAD_COURSE = 'UPLOAD_COURSE';

export function storeCourse(course) {
    let data = {
        pwd: 'ni1GpI2jub4^wJsixsZO8*',
        js_object: JSON.stringify(course.course)
    };

    // console.log('JSON.stringify(data)', course.course);
    // console.log('JSON.stringify(data)', JSON.stringify(data));

    const storedCourseId = axios.put(API_URL, JSON.stringify(data));
    // const storedCourseId = 'added';

    // console.log('storeCourse(course) {', storedCourseId);

    return {
        type: UPLOAD_COURSE,
        payload: storedCourseId
    }
}

