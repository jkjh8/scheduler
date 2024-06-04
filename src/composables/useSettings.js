import { reactive } from 'vue'
const settings = reactive({
  mainServer: 'http://localhost:3000',
  mainStatus: false,
  backupServer: '',
  backupStatus: false,
  active: false,
  mode: 'main',
  count: 0
})

export { settings }
