'use strict'
const Event = require('vigour-event')

module.exports = function esInit (value, event) {
  this.connect(value)
  this.event = new Event('db')

  this.readStreamCallbacks()
}
