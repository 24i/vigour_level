'use strict'
const vstamp = require('vigour-stamp')
const setStamps = function (stampContainer, types, setStamps) {
  if (setStamps && typeof setStamps !== 'object') {
    setStamps = {}
  }
  for (var i = 0, max = types.length; i < max; i++) {
    if (!stampContainer[types[i]]) {
      var stamp = (setStamps && setStamps[types[i]]) ? setStamps[types[i]] : vstamp.create(types[i], 'level')
      stampContainer[types[i]] = stamp
    }
  }
  return stampContainer
}

module.exports = function esInit (name, stamps) {
  var self = this
  self.stamps = setStamps(self.stamps || (self.stamps = {}), ['init', 'ready'], stamps)
  self._queue = []
  self.set({
    ready: false
  })
  self.getRoot().set({
    child: require('./data-listener')(self)
  })
  vstamp.on(self.stamps.init, function initReadStreamCallbacks () {
    self.getSetData()
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    self.set({ready: true}, self.stamps.ready)
  })
  vstamp.on(self.stamps.ready, function dbReadyClearInit () {
    for (var i = 0, max = self._queue.length; i < max; i++) {
      var el = self._queue[i]
      self.esDb.put(el.stamp, el.key, el.value, function (e) { return true })
    }
  })
  self.open()
}
