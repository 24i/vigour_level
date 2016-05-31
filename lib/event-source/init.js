'use strict'
const vstamp = require('vigour-stamp')
const setDataListener = require('./set-data-listener')

module.exports = function esInit (value, event) {
  console.log('levelDB - init', event)
  var self = this
  var hub = this.getRoot()
  // self.vstamp = vstamp
  self.stamps = {
    init: vstamp.create('init', 'level'),
    ready: vstamp.create('ready', 'level')
  }
  vstamp.on(self.stamps.init, function initReadStreamCallbacks () {
    self.readStreamCallbacks()
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    console.log('DB Ready')
    setDataListener(hub, self.parent.integral)
  })
  self.connect(value)
}
