import {create} from 'apisauce';
import Axios from 'axios';

const FAQ_CONTENT_API ='https://cdn.contentful.com/spaces/bk9ucum1q1qy/entries/?content_type=faq&access_token=a8cb058a6de0966d944ba402bb3d060c999cdb97d68be6c988ea7f21c87c4f97&select=sys.id,fields'

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
export const getFAQ = async(data) =>{
    const response = await Axios.get(FAQ_CONTENT_API)
    console.log('getFAQ ', response)
    if(response.status === 200) {
        const data = response.data.items.map(item =>  { return {id: item.sys.id, ...item.fields} })
        return {data, ok: true}
    }
    return response;
}
export default {
    submitRequest,
    getTicketInfo,
    decrypTicket,
    deleteTicket,
    detectIp,
    getFAQ
}
