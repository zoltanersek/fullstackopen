import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountry = (query) => {
    return axios.get(`${baseUrl}/${query}`)
    .then(res => res.data)
}

export default {
    getCountry
}