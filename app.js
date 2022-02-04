require('colors')

const {
  showMenu,
  pause,
  // readInput,
  // showListToDelete,
  // confirm,
  // showCheckList
} = require('./helpers/inquirer')
// const { saveDB, readDB } = require('./helpers/db-handler')

const main = async () => {
  let opt = ''

  do {
    opt = await showMenu()
    console.log(opt);

    if (opt !== 0) await pause()
  } while (opt !== 0)
}

main()
