import {create} from 'apisauce';

const api = create({
    baseURL: process.env.REACT_APP_WEB_API_URL,
    headers: {'Accept': 'application/json'}
});

// var instance = Axios.create({
//     baseURL: process.env.REACT_APP_WEB_API_URL,
//     //timeout: 1000,
//     //headers: {'X-Custom-Header': 'foobar'}
//   });

export const submitRequest = async(data) => {
    const response = await api.post('submit', data)
    return response;
}
export default {
    submitRequest
}
