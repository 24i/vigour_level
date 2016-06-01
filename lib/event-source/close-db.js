'use strict'
const vstamp = require('vigour-stamp')

module.exports = function esCloseDb (cb) {
  var self = this
  var closeStamp = vstamp.create('close', 'level')
  self.esDb.close(function () {
    self.set({ready: false}, closeStamp)
    if (cb) {
      cb()
    }
  })
}
