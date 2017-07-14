import axios from 'axios';

const apiUrl = 'https://5y0zlkijgc.execute-api.us-east-1.amazonaws.com/dev';
const getHeaders = {
    headers: {
        'Access-Control-Expose-Headers': 'X-json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'get',
        'Access-Control-Request-Headers': 'X-custom-header',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export default function (state = null, action) {
    switch (action.type) {
    case 'STORE_COURSE':
        let data = {
            pwd: 'ni1GpI2jub4^wJsixsZO8*',
            js_object: action.payload.json
        };
        let config = {
            method: 'option',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };


            axios.get(apiUrl, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            // axios.put(apiUrl, JSON.stringify(data, null, 4), config)
            // .then(function (response) {
            //     console.log(response);
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        // console.log(action.payload.json)
        return action.payload
    }

    return state
}