import axios from 'axios'
import https from 'node:https'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  withCredentials: true
})

let mainServerToken = ''
let backupServerToken = ''

const fnGetMainServerToken = async () => {
  try {
    const { data } = await api.post(
      `https://${defaultValue.mainServer}/api/auth`,
      {
        email: process.env.USERID,
        userPassword: process.env.USERPASSWORD
      }
    )
    mainServerToken = data.token
  } catch (error) {
    mainServerToken = ''
    logger.error(`Get Main Server Token Error ${error}`)
  }
}

const fnGetBackupServerToken = async () => {
  try {
    const { data } = await api.post(
      `https://${defaultValue.backupServer}/api/auth`,
      {
        email: process.env.USERID,
        userPassword: process.env.USERPASSWORD
      }
    )
    backupServerToken = data.token
  } catch (error) {
    backupServerToken = ''
    logger.error(`Get Backup Server Token Error ${error}`)
  }
}

const fnApiMain = async (method, url, data) => {
  try {
    const { data } = await api({
      method,
      url,
      data,
      headers: {
        Authorization: mainServerToken
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const fnApiBackup = async (method, url, data) => {
  try {
    const { data } = await api({
      method,
      url,
      data,
      headers: {
        Authorization: backupServerToken
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

export default api
export { fnGetMainServerToken, fnGetBackupServerToken, fnApiMain, fnApiBackup }
