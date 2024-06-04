const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, data) => {
    // whitelist channels
    ipcRenderer.send(channel, data)
  },
  receive: (channel, func) => {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (event, ...args) => func(...args))
  },
  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, ...args)
  }
})
