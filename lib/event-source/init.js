'use strict'
const vstamp = require('vigour-stamp')
const setDataListener = require('./set-data-listener')
// const generateKey = require('./keys/data').generate

module.exports = function esInit (value, event) {
  var self = this
  var hub = this.getRoot()
  self.stamps = {
    init: vstamp.create('init', 'level'),
    ready: vstamp.create('ready', 'level')
  }
  self.parent._queue = []
  hub.set(setDataListener(self.parent))

  vstamp.on(self.stamps.init, function initReadStreamCallbacks () {
    self.readStreamCallbacks()
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    self.parent.ready = true
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    for (var i = 0, max = self.parent._queue.length; i < max; i++) {
      var el = self.parent._queue[i]
      self.parent.integral.put(el.stamp, el.key, el.value, function (e) { return true })
    }
  })
  self.connect(value)
}
