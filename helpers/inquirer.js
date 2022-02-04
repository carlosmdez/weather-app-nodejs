const inquirer = require('inquirer')
require('colors')

const menuList = [
  {
    type: 'list',
    name: 'choice',
    message: '¿Qué desea hacer?',
    choices: [
      { value: 1, name: `${'1.'.green} Crear tarea` },
      { value: 2, name: `${'2.'.green} Listar tareas` },
      { value: 3, name: `${'3.'.green} Listar tareas completadas` },
      { value: 4, name: `${'4.'.green} Listar tareas pendientes` },
      { value: 5, name: `${'5.'.green} Completar tarea(s)` },
      { value: 6, name: `${'6.'.green} Borrar tarea` },
      { value: 0, name: `${'0.'.green} Salir` }
    ]
  }
]

const showMenu = async () => {
  console.clear()
  const { choice } = await inquirer.prompt(menuList)
  return choice
}

const showListToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}`.green
    const str = `${index}. ${task.description}`
    return { value: task.id, name: str }
  })
  choices.unshift({ value: 0, name: `${'0.'.green} Cancelar` })
  const menuConfig = [
    {
      type: 'list',
      name: 'taskId',
      message: '¿Qué tarea desea borrar?',
      choices
    }
  ]
  const { taskId } = await inquirer.prompt(menuConfig)
  return taskId
}

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}`.green
    const str = ` ${index}. ${task.description}`
    return { value: task.id, name: str, checked: !!task.doneDate }
  })
  const menuConfig = [
    {
      type: 'checkbox',
      name: 'tasksIds',
      message: 'Seleccione las tareas',
      choices
    }
  ]
  const { tasksIds } = await inquirer.prompt(menuConfig)
  return tasksIds
}

const pause = async () => {
  const message = `Presione ${'ENTER'.green} para continuar\n`
  console.log('\n')
  await inquirer.prompt([{ type: 'input', name: 'pause', message }])
}

const confirm = async () => {
  const question = [
    { type: 'confirm', name: 'confirmation', message: '¿Estás seguro?' }
  ]
  console.log('\n')
  const { confirmation } = await inquirer.prompt(question)
  return confirmation
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
  showListToDelete,
  confirm,
  showCheckList
}
