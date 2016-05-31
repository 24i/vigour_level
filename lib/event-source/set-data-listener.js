'use strict'

module.exports = function EventDbSetDataListener (hub, db) {
  hub.on('data', function (value, stamp) {
    console.log('realPath', this.realPath(false, true))
    db.put(stamp, this.realPath(false, true), value)
  })
}
