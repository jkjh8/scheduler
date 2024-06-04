import defaultValue from '../defaultVal'
import db from './index.js'
import logger from '../logger'

export default async function () {
  try {
    const docs = await db.find()
    if (docs && docs.length > 0) {
      docs.forEach((doc) => {
        defaultValue[doc.key] = doc.value
      })
    }
    logger.info('Init Value From DB')
  } catch (error) {
    logger.error(`Init Value From DB Error ${error}`)
  }
}
