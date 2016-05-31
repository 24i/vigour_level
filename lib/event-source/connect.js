'use strict'

const levelDB = require('./db')
const PREFIX = 'level-'
const PERIOD = 'P1D'
const vstamp = require('vigour-stamp')

module.exports = function levelDBConnect (dbName) {
  var dbSettings = this.parent
  var prefix = dbSettings.prefix || PREFIX
  var period = dbSettings.period || PERIOD
  dbSettings.set({ready: false})
  var db = dbSettings.integral = new levelDB.Construct(prefix + dbName, period)
  vstamp.close(this.stamps.init)
  return db
}
