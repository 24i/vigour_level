'use strict'

const vstamp = require('vigour-stamp')
const setWithPath = require('lodash.set')
const parseKey = require('./keys/data').parse
const parseValue = require('./values/data').parse

const createStamp = function createStreamStamp () {
  return vstamp.create('readStream', 'level')
}

module.exports = function getSetData () {
  if (this.esDb) {
    var level = this
    var db = level.esDb
    var base = this.getRoot()
    var stamp = level.stamps.readStream = createStamp()

    db.open(function onOpen () {
      var r = db.createReadStream()
      r.on('data', function onData (data) {
        if (!data.key) {
          return
        }
        var key = parseKey(data.key)
        var value = parseValue(data.value)
        var deepData = base
        for (var i = 0, max = key.keyEl.length; i < max; i++) {
          var keyEl = key.keyEl[i]
          if (deepData[keyEl]) {
            deepData = deepData[keyEl]
          } else {
            var setData = {}
            var curKey = key.keyEl.slice(i).join('.')
            setWithPath(setData, curKey, value.val)
            deepData.set(setData, value.stamp)
            break
          }
        }
      })
        .on('error', function onError () {
          vstamp.close(stamp)
        })
        .on('close', function onClose () {
          vstamp.remove(stamp)
        })
        .on('end', function onEnd () {
          vstamp.close(stamp)
          vstamp.close(level.stamps.ready)
        })
    })
  }
}
