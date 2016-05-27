'use strict'

var levelup = require('levelup')
var levelDB = require('./db')
var PREFIX = 'level-'

module.exports = function levelDBConnect (dbName) {
  var dbSettings = this.parent
  dbSettings.set({ready: false})

  var prefix = dbSettings.prefix || PREFIX

  var db = dbSettings.integral = levelup(prefix + dbName, {db: levelDB})

  return db
}
