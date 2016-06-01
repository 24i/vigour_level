'use strict'
const vstamp = require('vigour-stamp')
const setWithPath = require('lodash.set')
const MAXSET = 100
const parseKey = require('./keys/data').parse
const parseValue = require('./parse-value')

const createStamp = function createStreamStamp () {
  return vstamp.create('readStream', 'level')
}

module.exports = function getReadStream () {
  if (this.parent.integral) {
    var dbSettings = this.parent
    var db = dbSettings.integral
    var level = this
    var hub = this.getRoot()
    var stamp = level.stamps.readStream = createStamp()
    var maxSet = dbSettings.maxSet || MAXSET

    db.open(function onOpen () {
      var r = db.createReadStream()
      var obj = {}
      var cnt = 0

      r.on('data', function onData (data) {
        if (!data.key) {
          return
        }
        var parse = parseKey(data.key)
        var baseObj = obj
        data.key = parse.key
        setWithPath(baseObj, data.key, parseValue(data.value))
        cnt++

        if (cnt > maxSet) {
          hub.set(obj, stamp)
          vstamp.close(stamp)
          level.stamps.readStream = createStamp()
          obj = {}
          cnt = 0
        }
      })
        .on('error', function onError () {
          vstamp.close(stamp)
        })
        .on('close', function onClose () {
          vstamp.remove(stamp)
        })
        .on('end', function onEnd () {
          console.log('end', obj)
          hub.set(obj, stamp)
          vstamp.close(stamp)
          vstamp.close(level.stamps.ready)
        })
    })
  }
}
