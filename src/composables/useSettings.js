import { reactive } from 'vue'
const settings = reactive({
  mainServer: '',
  mainStatus: false,
  backupServer: '',
  backupStatus: false,
  active: false,
  activeMode: 'main',
  mode: 'main',
  count: 0,
  auto: false,
  update: false,
  relayOnTime: 5,
  connected: false
})

const fnUpdateSettings = (args) => {
  if (typeof args === 'object') {
    for (let key in args) {
      if (key in settings) {
        settings[key] = args[key]
      }
    }
  }
}

export { settings, fnUpdateSettings }
