'use strict'

const levelDB = require('./db')
const PREFIX = 'level-'
const PERIOD = 'P1D'

module.exports = function levelDBConnect (dbName) {
  var dbSettings = this.parent
  dbSettings.set({ready: false})

  var prefix = dbSettings.prefix || PREFIX
  var period = dbSettings.period || PERIOD

  var db = dbSettings.integral = new levelDB.Construct(prefix + dbName, period)

  return db
}
