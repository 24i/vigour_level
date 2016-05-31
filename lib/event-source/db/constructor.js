'use strict'

const levelup = require('levelup')
const keys = require('../keys')
const periodCalculation = require('./period-calculation')
const levelDB = require('../../level-db')
const cacheSize = 32 * 1024 * 1024
const writeBufferSize = 32 * 1024 * 1024

var EventDb = module.exports = function EventDb (name, period) {
  this.name = name
  this.period = period || 'P1D'
  this.switchInProgres = false
  this.dbTypes = {
    current: {period: this.period, add: 0},
    next: {period: this.period, add: 1},
    data: {}
  }
  this.queue = []
  this.dbStack = {}
  this.dbs = {
    current: this._setDb('current'),
    next: this._setDb('next'),
    data: this._setDb('data')
  }
}

var eventdb = EventDb.prototype
eventdb._setDb = function (type) {
  if (this.dbTypes[type]) {
    var dbKey
    if (this.dbTypes[type].period) {
      dbKey = periodCalculation(this.dbTypes[type].period, this.dbTypes[type].add).getTime()
    } else {
      dbKey = type
    }
    if (!this.dbStack[dbKey]) {
      this.dbStack[dbKey] = levelup(this.name + '-' + dbKey, {cacheSize: cacheSize, db: levelDB, writeBufferSize: writeBufferSize})
      this.dbStack[dbKey]._stamp = false
    }
    return dbKey
  } else {
    return false
  }
}

eventdb._getDb = function EventDbGet (type) {
  if (this.dbTypes[type]) {
    return this.dbStack[this.dbs[type]]
  }
  return false
}

eventdb._execOperation = function (operation, stamp, key, value, callback) {
  var ts = (new Date()).getTime()
  var doSwitch = false
  var self = this
  var db
  if (this.switchInProgres) {
    this.queue.push({ o: operation, s: stamp, k: key, v: value, c: callback })
  } else {
    if (ts < this.dbs.next) {
      db = this._getDb('current')
    } else {
      db = this._getDb('next')
      doSwitch = true
    }
    db[operation](keys.events.generate(stamp, key), value, function dataOperation (e) {
      if (!e) {
        if (!db._stamp) {
          db._stamp = stamp
        }
        self._getDb('data')[operation](keys.data.generate(key), value, callback)
        if (doSwitch) {
          self.switchDb()
        }
      } else {
        callback(e)
      }
    })
  }
}

eventdb.put = function EventDbSet (stamp, key, value, callback) {
  this._execOperation('put', stamp, key, value, callback)
}

eventdb.delete = function EventDbDelete (stamp, key, callback) {
  this._execOperation('put', stamp, key, '', callback)
}

eventdb._executeQueue = function EventExecuteQueue () {
  var self = this
  for (var i = 0, max = this.queue.length; i < max; i++) {
    var item = this.queue[i]
    self._execOperation(item.o, item.s, item.k, item.v, item.c)
  }
}

eventdb.switchDB = function EventSwitchDb () {
  this.switchInProgres = true
  Object.defineProperty(this.dbs, 'current', Object.getOwnPropertyDescriptor(this.dbs, 'next'))
  delete this.dbs.next
  this.switchInProgres = false
  this._executeQueue()
  this.dbs.next = this._setDb('next')
}

eventdb.createReadStream = function EventDbReadStream (opts) {
  return this._getDb('data').createReadStream(opts)
}

eventdb.createEventStream = function EventDbEventStream (opts) {
  return this._getDb('current').createReadStream(opts)
}
eventdb.get = function EventDbGet () {
  return this._getDb('')
}
eventdb.open = function EventDBDataOpen (openCb) {
  return this._getDb('data').open(openCb)
}
eventdb.eventOpen = function EventDBEventOpen (openCb) {
  return this._getDb('current').open(openCb)
}
