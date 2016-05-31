'use strict'

const parseKey = require('./keys/data')

module.exports = function EventDbSetDataListener (hub, db) {
  hub.on('data', function (value, stamp) {
    if (hub.db.ready === true) {
      console.log('realPath', this.realPath(false, true))
      db.put(stamp, parseKey(this.realPath(false, true)), value)
    } else {
      console.log('notReadyYet', hub.db.ready)
    }
  })
}
