import dgram from 'dgram'
import logger from 'src-electron/logger'
import { fnMulticastParser } from 'src-electron/multicast/parcing'

const address = '239.129.129.12'
const port = 9997
let socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })

function fnInitMulticast() {
  socket.on('message', (msg, rinfo) => {
    const { key, value } = JSON.parse(msg.toString().trim())
    fnMulticastParser(key, value)
  })

  socket.on('listening', () => {
    socket.setBroadcast(true)
    socket.setMulticastTTL(0)
    socket.addMembership(address)
    logger.info(`Server is listening on ${address}:${port}`)
  })
  socket.bind(port)
}

export { fnInitMulticast }
