import axios from 'axios'
import https from 'node:https'

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

export default api
