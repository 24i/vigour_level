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

var writeDoneStamp = vstamp.create('setDone', 'test')

vstamp.on(stamps.init, function () {
  console.log('connect test', dbName)
  require('./connect')(testObservable, dbName)
})
vstamp.on(stamps.init, function () {
  console.log('set-queue test', dbName)
  require('./set-queue')(testObservable, dbName)
})
vstamp.on(stamps.ready, function () {
  console.log('set-default test', dbName)
// require('./set-default')(getObservable(), dbName, writeDoneStamp)
})
vstamp.on(writeDoneStamp, function () {
  console.log('read-stream test', dbName)
// require('./read-stream')(getObservable(), dbName)
})

testObservable.set({
  db: {
    inject: require('../../lib'),
    stamps: stamps,
    name: dbName
  }
})

require('./on-finish-test')(testObservable, dbName)
