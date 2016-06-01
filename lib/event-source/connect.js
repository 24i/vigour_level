'use strict'

const levelDB = require('./db')
const PREFIX = 'level-'
const PERIOD = 'P1D'
const vstamp = require('vigour-stamp')

module.exports = function levelDBConnect (dbName) {
  var dbSettings = this.parent
  var prefix = dbSettings.prefix || PREFIX
  var period = dbSettings.period || PERIOD
  var db = new levelDB.Construct(prefix + dbName, period)
  console.log('setDB')
  dbSettings.set({ready: false, integral: db})
  console.log(dbSettings)
  vstamp.close(this.stamps.init)
  return db
}
