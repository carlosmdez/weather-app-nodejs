require('dotenv').config()
require('colors')

const {
  showMenu,
  pause,
  readInput,
  showPlacesList
} = require('./helpers/inquirer')
const Searches = require('./models/searches')

const main = async () => {
  const searches = new Searches()
  let opt = ''

  do {
    opt = await showMenu()
    switch (opt) {
      case 1:
        const input = await readInput('Ciudad: ')
        const places = await searches.getCities(input)
        const placeId = await showPlacesList(places)
        if (placeId === 0) continue
        const placeSel = places.find(p => p.id === placeId)
        searches.addHistoryElement(placeSel.name)
        const { lat, lng } = placeSel
        const weather = await searches.getWeather(lat, lng)
        console.clear()
        console.log(`\nInformación de la ciudad\n`.green)
        console.log('Ciudad: ', placeSel.name)
        console.log('Lat: ', placeSel.lat)
        console.log('Lng: ', placeSel.lng)
        console.log('Temperatura: ', weather.temp)
        console.log('Temp. Máxima: ', weather.temp_max)
        console.log('Temp. Mínima: ', weather.temp_min)
        console.log('Clima: ', weather.weather)
        break
      case 2:
        searches.history.forEach((p, i) => {
          console.log(`${i + 1}. ${p}`)
        })
        break
      default:
        break
    }

    if (opt !== 0) await pause()
  } while (opt !== 0)
}

main()
