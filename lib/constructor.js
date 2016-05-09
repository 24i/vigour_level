'use strict'
var Observable = require('vigour-observable')
var levelup = require('levelup')
var Event = require('vigour-event')
var levelDB = require('./db')

var isNumberLike = require('vigour-util/is/numberlike')
var setWithPath = require('lodash.set')

var PREFIX = 'level-'
var MAXSET = 100

module.exports = new Observable({
  define: {
    connect: function (dbName) {
      var dbSettings = this.parent

      dbSettings.set({ready: false})

      var prefix = dbSettings.prefix || PREFIX

      var db = dbSettings.integral = levelup(prefix + dbName, {db: levelDB})

      return db
    },
    parseKey: function (key) {
      var parse = key.split('|')
      return {
        scope: parse[0],
        key: parse[1]
      }
    },
    readStreamCallbacks: function () {
      if (this.parent.integral) {
        var dbSettings = this.parent
        var db = dbSettings.integral
        var level = this
        var hub = this.parent.parent
        var event = this.event

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

            if (typeof data.value === 'string' && data.value[0] === '$' && data.value[1] === '.') {
              let arr = data.value.split('.')
              let target = scopedObj
              let paths = data.key.split('.')

              for (let n = 0, max = paths.length; n < max; n++) {
                if (n === (max - 1)) {
                  target[paths[n]] = arr
                } else {
                  target = (target[paths[n]] || (target[paths[n]] = {}))
                }
              }
            } else {
              if (isNumberLike(data.value)) {
                data.value = Number(data.value)
              } else if (data.value === 'false') {
                data.value = false
              } else if (data.value === 'true') {
                data.value = true
              } else if (data.value === 'undefined') {
                data.value = ''
              }

              setWithPath(scopedObj, data.key.split('.'), data.value)
            }

            cnt++

            if (cnt > maxSet) {
              scopedHub = scopedHub.set(scopedObj, event) || scopedHub
              level.event.trigger()
              level.event = new Event('db')
              obj[scope] = {}
              cnt = 0
            }
          })
            .on('error', function onError () {
              level.event.remove()
            })
            .on('close', function onClose () {
              level.event.remove()
            })
            .on('end', function onEnd () {
              for (var i in obj) {
                if (i === '_') {
                  hub.set(obj[i], event)
                } else {
                  hub.getScope(i).set(obj[i], event)
                }
              }
              level.event.trigger()
              dbSettings.ready.val = true
            })
        })
      }
    }
  },
  on: {
    data: {
      level: function (value, event) {
        this.connect(value)
        this.event = new Event('db')

        this.readStreamCallbacks()
      }
    }
  }
})
