import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY;


const getAll = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    return request.then(response => response.data)
}

const getWheather = (country) => {
    const request = axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country}&aqi=no`)
    return request.then(response=>response.data)
}

export default {getAll,getCountry,getWheather}