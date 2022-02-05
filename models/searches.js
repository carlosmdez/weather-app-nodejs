const axios = require('axios')

const mapsParams = {
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    access_token: process.env.MAPBOX_KEY,
    language: 'es',
    limit: 5
  }
}

const weatherParams = (lat, lng) => ({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.OPENWEATHER_KEY,
    lat,
    lon: lng,
    units: 'metric',
    lang: 'es'
  }
})

class Searches {
  constructor() {
    this.list = []
    this.history = []
  }

  addHistoryElement(place) {
    if (this.history.includes(place)) return
    this.history.unshift(place)
    if (this.history.length > 5) this.history.pop()
  }

  async getCities(place = '') {
    const instance = axios.create(mapsParams)
    try {
      const res = await instance.get(`/${place}.json`)
      return res.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        lat: place.center[1],
        lng: place.center[0]
      }))
    } catch (error) {
      console.log(error)
    }
  }

  async getWeather(lat, lng) {
    try {
      const instance = axios.create(weatherParams(lat, lng))
      const res = await instance.get('/weather')
      const { main: data, weather } = res.data
      return {
        temp: data.temp,
        temp_max: data.temp_max,
        temp_min: data.temp_min,
        weather: weather[0].description
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Searches
