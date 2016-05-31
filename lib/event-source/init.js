'use strict'
const vstamp = require('vigour-stamp')
const setDataListener = require('./set-data-listener')
const generateKey = require('./keys/data').generate

module.exports = function esInit (value, event) {
  console.log('levelDB - init', event)
  var self = this
  var hub = this.getRoot()
  self.stamps = {
    init: vstamp.create('init', 'level'),
    ready: vstamp.create('ready', 'level')
  }
  self.parent._queue = []
  setDataListener(hub, self.parent.integral)
  vstamp.on(self.stamps.init, function initReadStreamCallbacks () {
    self.readStreamCallbacks()
  })
  vstamp.on(self.stamps.ready, function dbReadyExecuteQueue () {
    hub.set({
      on: {
        data: {
          level: function setData (value, stamp) {
            console.log('set', stamp, generateKey(this.realPath(this.getRoot(), true)), value)
            if (self.parent.ready === true) {
              self.parent.integral.put(stamp, generateKey(this.realPath(this.getRoot(), true).join('.')), value)
            } else {
              self.parent._queue.push({stamp: stamp, key: generateKey(this.realPath(this.getRoot(), true).join('.')), value: value})
            }
          }
        }
      }
    })
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    self.parent.set({ready: true})
    console.log('DB Ready', true)
  })
  self.connect(value)
}
