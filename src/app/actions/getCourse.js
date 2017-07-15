import axios from 'axios';

const API_URL = 'https://5y0zlkijgc.execute-api.us-east-1.amazonaws.com/dev';

export const GET_COURSE = 'GET_COURSE';

export function getCourse(courseId) {
    // console.log('getCourse(courseId)', JSON.stringify(courseId.courseId))
    let postData = {
        id: courseId.courseId
        // id: "17fe71d3995284ae552cf403e80b79a968ed0785d937c2c09c8c5093"
    };
    // let postData = JSON.stringify({"id": 'edc9f1f39dd69eef1f4e1377771bc1008398c474050ac1ad9345fb5d'});

    // console.log('JSON.stringify(postData)', JSON.stringify(postData))
    // console.log('postData', postData)
    const course =  axios.post(API_URL, JSON.stringify(postData));

    return {
        type: GET_COURSE,
        payload: course
    }
}

