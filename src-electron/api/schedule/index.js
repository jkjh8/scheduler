import api from 'src-electron/api'
import logger from 'src-electron/logger'
import defaultValue from 'src-electron/defaultVal'

const schedule = []

const fnGetAddr = (addr) => {
  return {
    main: `${defaultValue.mainServer}/${addr}`,
    backup: `${defaultValue.backupServer}/${addr}`
  }
}

const fnGetSchedule = async () => {
  try {
    const addresses = fnGetAddr('api/app/schedule')
    const { data } = await api.get(addresses.main)
    console.log(data)
  } catch (error) {
    logger.error(`Get Schedule Error ${error}`)
  }
}

export { schedule, fnGetAddr, fnGetSchedule }
