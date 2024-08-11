import axios from 'axios'
import https from 'node:https'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'
import { fnRt, fnRtSettings } from 'src-electron/api'
import { schedules, fnUpdateSchedule } from 'src-electron/schedules'

let mainServerFail = 0
// const api = axios.create({
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   }),
//   withCredentials: true,
//   headers: {
//     authenticate: process.env.SCHEDULER_PASS
//   }
// })

const fnGetAddr = () => {
  return defaultValue.mode === 'main'
    ? defaultValue.mainServer
    : defaultValue.backupServer
}

const fnGetScheduleToday = async () => {
  try {
    if (defaultValue.mode === 'main') {
      await fnGetMainServer()
    } else {
      await fnGetBackupServer()
    }
  } catch (error) {
    logger.error(`Get Schedule Today Error ${error}`)
  }
}

const fnGetMainServer = async () => {
  try {
    if (!defaultValue.mainServer) {
      throw new Error('Main Server not set')
    }
    const { data } = await axios.get(
      `https://${defaultValue.mainServer}/api/scheduler`,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        withCredentials: true,
        headers: {
          authenticate: process.env.SCHEDULER_PASS
        }
      }
    )
    mainServerFail = 0
    defaultValue.mainStatus = true
    defaultValue.relayOnTime = data.relayOnTime
    fnUpdateSchedule(data.schedules)
    fnRt('schedules', schedules)
  } catch (error) {
    defaultValue.mainStatus = false
  }
}

const fnGetBackupServer = async () => {
  try {
    if (!defaultValue.backupServer) {
      throw new Error('Backup Server not set')
    }
    const { data } = await axios.get(
      `https://${defaultValue.backupServer}/api/scheduler`,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        withCredentials: true,
        headers: {
          authenticate: process.env.SCHEDULER_PASS
        }
      }
    )
    defaultValue.backupStatus = true
    defaultValue.relayOnTime = data.relayOnTime
    fnUpdateSchedule(data.schedules)
    fnRt('schedules', schedules)
  } catch (error) {
    defaultValue.backupStatus = false
  }
}

const fnCheckMainServer = async () => {
  try {
    if (!defaultValue.mainServer) {
      throw new Error('Main Server not set')
    }
    const { data } = await axios.get(
      `https://${defaultValue.mainServer}/api/scheduler/check?mode=${defaultValue.mode}`,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        withCredentials: true,
        headers: {
          authenticate: process.env.SCHEDULER_PASS
        }
      }
    )
    defaultValue.mainStatus = true
    defaultValue.activeMode = data.active
    defaultValue.relayOnTime = data.relayOnTime
    mainServerFail = 0
    if (defaultValue.update) {
      defaultValue.auto = data.auto
      defaultValue.active = data.active === 'main'
    }
    fnRt('schedules', schedules)
  } catch (error) {
    defaultValue.mainStatus = false
    mainServerFail++
  } finally {
    fnRtSettings()
  }
}

const fnCheckBackupServer = async () => {
  try {
    if (!defaultValue.backupServer) {
      throw new Error('Backup Server not set')
    }
    const { data } = await axios.get(
      `https://${defaultValue.backupServer}/api/scheduler/check?mode=${defaultValue.mode}`,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        withCredentials: true,
        headers: {
          authenticate: process.env.SCHEDULER_PASS
        }
      }
    )
    defaultValue.backupStatus = true
    defaultValue.activeMode = data.active
    defaultValue.relayOnTime = data.relayOnTime
    if (defaultValue.update) {
      defaultValue.auto = data.auto
      defaultValue.active = data.active === 'backup'
    }
    if (
      defaultValue.auto &&
      defaultValue.mode === 'backup' &&
      mainServerFail > 5
    ) {
      defaultValue.active = true
    }
    if (defaultValue.auto && mainServerFail < 1) {
      defaultValue.active = false
    }
    fnRt('schedules', schedules)
  } catch (error) {
    defaultValue.backupStatus = false
  } finally {
    fnRtSettings()
  }
}

const fnPutActiveMode = async (mode) => {
  try {
    const servers = [defaultValue.mainServer, defaultValue.backupServer]
    for (const server of servers) {
      if (server) {
        const { data } = await axios.put(
          `https://${server}/api/scheduler/mode`,
          {
            mode
          },
          {
            httpsAgent: new https.Agent({
              rejectUnauthorized: false
            }),
            withCredentials: true,
            headers: {
              authenticate: process.env.SCHEDULER_PASS
            }
          }
        )
        defaultValue.activeMode = data.mode
      }
    }
    defaultValue.active = defaultValue.mode === defaultValue.activeMode
  } catch (error) {
    logger.error(`Put Active Mode Error ${error}`)
  } finally {
    fnRtSettings()
  }
}

const fnInTime = async (schedule) => {
  try {
    const { data } = await axios.put(
      `https://${fnGetAddr()}/api/scheduler`,
      {
        schedule
      },
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        withCredentials: true,
        headers: {
          authenticate: process.env.SCHEDULER_PASS
        }
      }
    )
  } catch (error) {
    logger.error(`In Time Error ${error}`)
  }
}

const fnClean = async () => {
  try {
    const { data } = await axios.get(
      `https://${fnGetAddr()}/api/scheduler/clean`,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        withCredentials: true,
        headers: {
          authenticate: process.env.SCHEDULER_PASS
        }
      }
    )
  } catch (error) {
    logger.error(`Clean Error ${error}`)
  }
}

const fnGetRelayOnTime = async () => {
  try {
    const { data } = await axios.get(
      `https://${fnGetAddr()}/api/scheduler/relay`,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        withCredentials: true,
        headers: {
          authenticate: process.env.SCHEDULER_PASS
        }
      }
    )
    defaultValue.relayOnTime = data.relayOnTime
  } catch (error) {
    logger.error(`Get Relay On Time Error ${error}`)
  }
}

export {
  fnGetScheduleToday,
  fnCheckMainServer,
  fnCheckBackupServer,
  fnPutActiveMode,
  fnInTime,
  fnClean,
  fnGetRelayOnTime
}
