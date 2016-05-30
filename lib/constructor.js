'use strict'
const Observable = require('vigour-observable')
const eventSource = require('./event-source')

module.exports = new Observable({
  define: {
    connect: eventSource.connect,
    parseKey: eventSource.parseKey,
    readStreamCallbacks: eventSource.getReadStream
  },
  on: {
    data: {
      level: eventSource.init
    }
  }
})
