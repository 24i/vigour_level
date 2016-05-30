'use strict'
const vstamp = require('vigour-stamp')
const Event = require('vigour-event')
const isNumberLike = require('vigour-util/is/numberlike')
const setWithPath = require('lodash.set')
const MAXSET = 100

const createStamp = function createStreamStamp () {
  return vstamp.create('readStream', 'level')
}

const parseValue = function parseValue (value) {
  if (value === 'string' && value[0] === '$' && value[1] === '.') {
    return value
  } else if (isNumberLike(value)) {
    return Number(value)
  } else if (value === 'false') {
    return false
  } else if (value === 'true') {
    return true
  } else if (value === 'undefined') {
    return ''
  }
  return value
}

module.exports = function getReadStream () {
  if (this.parent.integral) {
    var dbSettings = this.parent
    var db = dbSettings.integral
    var level = this
    var hub = this.parent.parent
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

        var parse = level.parseKey(data.key)
        var scope = parse.scope
        var scopedObj = (obj[scope] || (obj[scope] = {}))
        var scopedHub = scope === '_' ? hub : hub.getScope(scope)

        data.key = parse.key
        setWithPath(scopedObj, data.key, parseValue(data.value))
        cnt++

        if (cnt > maxSet) {
          scopedHub = scopedHub.set(scopedObj, stamp) || scopedHub
          vstamp.close(stamp)
          level.stamps.readStream = createStamp()
          obj[scope] = {}
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
          for (var i in obj) {
            if (i === '_') {
              hub.set(obj[i], stamp)
            } else {
              hub.getScope(i).set(obj[i], stamp)
            }
          }
          vstamp.close(stamp)
          vstamp.close(level.stamps.ready)
        })
    })
  }
}
