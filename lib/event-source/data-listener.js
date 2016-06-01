'use strict'

const generateKey = require('./keys/data').generate

module.exports = function (db) {
  return {
    on: {
      data: {
        level: function setChildData (value, stamp) {
          if (typeof value !== 'object') {
            if (db.ready.compute() === true) {
              db.esDb.put(stamp, generateKey(this.realPath(this.getRoot(), true).join('.')), value)
            }
          }
        }
      }
    },
    child: 'Constructor'
  }
}
