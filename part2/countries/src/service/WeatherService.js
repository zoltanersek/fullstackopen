import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (location) => {
    const appId = import.meta.env.VITE_APP_ID
    return axios.get(`${baseUrl}?q=${location}&appid=${appId}&units=metric`).then((res) => res.data)
}

export default {
    getWeather
}