'use strict'

const levelDB = require('./db')
const PREFIX = 'level-'
const PERIOD = 'P1D'
const vstamp = require('vigour-stamp')

module.exports = function esConnect () {
  var name = this.name
  var prefix = this.prefix || PREFIX
  var period = this.period || PERIOD
  console.log('CONNECT', name, prefix, period)
  this.esDb = new levelDB.Construct(prefix + name, period)
  vstamp.close(this.stamps.init)
}
