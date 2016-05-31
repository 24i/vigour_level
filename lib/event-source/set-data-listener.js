'use strict'

const generateKey = require('./keys/data').generate

module.exports = function EventDbSetDataListener (db) {
  return {
    Child: {
      on: {
        data: {
          level: function setChildData (value, stamp) {
            if (typeof value !== 'object') {
              if (db.ready === true) {
                db.integral.put(stamp, generateKey(this.realPath(this.getRoot(), true).join('.')), value)
              } else {
                db._queue.push({stamp: stamp, key: generateKey(this.realPath(this.getRoot(), true).join('.')), value: value})
              }
            }
          }
        }
      },
      Child: 'Constructor'
    }
  }
}
