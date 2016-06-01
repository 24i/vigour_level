'use strict'

const levelDB = require('./db')
const PREFIX = 'level-'
const PERIOD = 'P1D'
const vstamp = require('vigour-stamp')

module.exports = function esOpen (cb) {
  var name = this.name
  var prefix = this.prefix || PREFIX
  var period = this.period || PERIOD
  this.esDb = new levelDB.Construct(prefix + name, period)
  vstamp.close(this.stamps.init)
  if (cb) {
    cb()
  }
}
