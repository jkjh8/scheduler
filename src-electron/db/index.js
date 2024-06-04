const { app } = require('electron')
const Datastore = require('nedb-promises')

const dbPath = `${app.getPath('userData')}/data.db`

const db = Datastore.create({ filename: dbPath, autoload: true })

export default db
