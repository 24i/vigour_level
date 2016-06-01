'use strict'
const Observable = require('vigour-observable')
const vstamp = require('vigour-stamp')
const now = new Date()
const dbName = 'test-' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '-' + now.getHours() + now.getMinutes()

var testObservable = new Observable()

var stamps = {
  init: vstamp.create('init', 'test'),
  ready: vstamp.create('ready', 'test')
}

var testStamps = {
  connect: vstamp.create('connect', 'test'),
  setQueue: vstamp.create('setQueue', 'test'),
  setDefault: vstamp.create('setDefault', 'test'),
  readStream: vstamp.create('readStream', 'test')
}

vstamp.on(stamps.init, function () {
  require('./connect')(testObservable, dbName)
})
vstamp.on(stamps.ready, function () {
  require('./set-default')(testObservable, dbName, testStamps.setDefault)
})
vstamp.on(testStamps.setDefault, function () {
  require('./read-stream')(testObservable, dbName, testStamps.readStream)
})

vstamp.on(testStamps.readStream, function () {
  require('./on-finish-test')(testObservable, dbName)
})

testObservable.set({
  db: {
    inject: require('../../lib'),
    stamps: stamps,
    name: dbName
  }
})
