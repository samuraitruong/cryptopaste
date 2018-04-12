import {create} from 'apisauce';
import Axios from 'axios';

const api = create({
    baseURL: process.env.REACT_APP_WEB_API_URL,
    headers: {'Accept': 'application/json'}
});

// var instance = Axios.create({
//     baseURL: process.env.REACT_APP_WEB_API_URL,
//     //timeout: 1000,
//     //headers: {'X-Custom-Header': 'foobar'}
//   });
export const detectIp = async() => {
    const response = await Axios.get('https://api.ipify.org/?format=json')
    return response;
}

export const submitRequest = async(data) => {
    const response = await api.post('crypto/create', data)
    return response;
}
export const getTicketInfo = async(ticketId) => {
    const response = await api.get('crypto/details/'+ ticketId)
    return response;
}
export const decrypTicket = async(data) => {
    const response = await api.post('crypto/decrypt', data)
    return response;
}
export const deleteTicket = async(data) => {
    const response = await api.post('crypto/delete', data)
    return response;
}
export default {
    submitRequest,
    getTicketInfo,
    decrypTicket,
    deleteTicket,
    detectIp
}
