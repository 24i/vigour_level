'use strict'
const vstamp = require('vigour-stamp')
// const setDataListener = require('./set-data-listener')
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
  vstamp.on(self.stamps.init, function initReadStreamCallbacks () {
    self.readStreamCallbacks()
  })
  hub.set({
    on: {
      data: {
        level: function setData (value, stamp) {
          console.log('set', stamp, generateKey(this.realPath(this.getRoot(), true)), value)
          if (!value.db) {
            if (self.parent.ready === true) {
              console.log('put', {stamp: stamp, key: generateKey(this.realPath(this.getRoot(), true).join('.')), value: value})
              self.parent.integral.put(stamp, generateKey(this.realPath(this.getRoot(), true).join('.')), value)
            } else {
              console.log('queued', {stamp: stamp, key: generateKey(this.realPath(this.getRoot(), true).join('.')), value: value})
              self.parent._queue.push({stamp: stamp, key: generateKey(this.realPath(this.getRoot(), true).join('.')), value: value})
            }
          }
        }
      }
    }
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    self.parent.ready = true
    console.log('DB Ready', true)
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    console.log('ready', self.parent._queue)
    for (var i = 0, max = self.parent._queue.length; i < max; i++) {
      var el = self.parent._queue[i]
      console.log('el', el)
      console.log('self.parent.integral', self.parent.integral)
      self.parent.integral.put(el.stamp, el.key, el.value, function (e) {
        console.log('Put executed', e)
      })
    }
  })
  self.connect(value)
}
