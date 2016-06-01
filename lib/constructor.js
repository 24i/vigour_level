'use strict'
const Observable = require('vigour-observable')
const eventSource = require('./event-source')

module.exports = new Observable({
  define: {
    connect: eventSource.connect,
    readStreamCallbacks: eventSource.getReadStream
  },
  on: {
    data: {
      level: eventSource.init
    }
  }
})
