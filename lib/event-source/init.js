'use strict'
const Event = require('vigour-event')
const vstamp = require('vigour-stamp')

module.exports = function esInit (value, event) {
  console.log('levelDB - init', event)
  var self = this
  // self.vstamp = vstamp
  self.stamps = {
    init: vstamp.create('init', 'level'),
    ready: vstamp.create('ready', 'level')
  }
  vstamp.on(self.stamps.init, function initReadStreamCallbacks () {
    self.readStreamCallbacks()
  })
  vstamp.on(self.stamps.ready, function dbReady () {
    console.log('DB Ready')
    vstamp.remove(self.stamps.init)
  })
  self.connect(value)
}
