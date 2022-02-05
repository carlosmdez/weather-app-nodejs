const inquirer = require('inquirer')
require('colors')

const menuList = [
  {
    type: 'list',
    name: 'choice',
    message: '¿Qué desea hacer?',
    choices: [
      { value: 1, name: `${'1.'.green} Buscar ciudad` },
      { value: 2, name: `${'2.'.green} Historial` },
      { value: 0, name: `${'0.'.green} Salir` }
    ]
  }
]

const showMenu = async () => {
  console.clear()
  const { choice } = await inquirer.prompt(menuList)
  return choice
}

const showPlacesList = async (places = []) => {
  const choices = places.map((place, i) => {
    const index = `${i + 1}`.green
    const str = `${index}. ${place.name}`
    return { value: place.id, name: str }
  })
  choices.unshift({ value: 0, name: `${'0.'.green} Cancelar` })
  const menuConfig = [
    {
      type: 'list',
      name: 'placeId',
      message: 'Seleccione lugar: ',
      choices
    }
  ]
  const { placeId } = await inquirer.prompt(menuConfig)
  return placeId
}

const pause = async () => {
  const message = `Presione ${'ENTER'.green} para continuar\n`
  console.log('\n')
  await inquirer.prompt([{ type: 'input', name: 'pause', message }])
}

const readInput = async message => {
  const question = {
    type: 'input',
    name: 'description',
    message,
    validate(value) {
      if (value.length === 0) {
        return 'Por favor ingrese un valor'
      }
      return true
    }
  }
  const { description } = await inquirer.prompt(question)
  return description
}

module.exports = {
  showMenu,
  pause,
  readInput,
  showPlacesList
}
