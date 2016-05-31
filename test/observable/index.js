'use strict'
const Observable = require('vigour-observable')
const now = new Date()
const dbName = 'test-' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '-' + now.getHours() + now.getMinutes()
var obs = new Observable({
  db: {
    inject: require('../../lib'),
    name: dbName
  }
})
require('./on-finish-test')(obs, dbName)
require('./connect')(obs, dbName)
require('./set')(obs, dbName)
