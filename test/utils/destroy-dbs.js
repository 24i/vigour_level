'use strict'

var destroyDb = function (dbType, desDb) {
  if (desDb && desDb.options.db && desDb.options.db.destroy) {
    desDb.close(function (e) {
      var msgType = console.info
      var checkText = '✓'
      if (e) {
        msgType = console.error
        checkText = '☒'
      }
      msgType(checkText + ' closing db ' + dbType + ' should fire no error', e || '')

      desDb.options.db.destroy(desDb.db.location, function (e) {
        var msgType = console.info
        var checkText = '✓'
        if (e) {
          msgType = console.error
          checkText = '☒'
        }
        msgType(checkText + ' destroying db ' + dbType + ' on location "' + desDb.db.location + '" should fire no error', e || '')
      })
    })
  } else {
    console.error('destroying db ' + dbType + ' on location "' + desDb.db.location + '" should fire no error')
  }
}

module.exports = function destroyAllDbs (db) {
  var dbs = Object.keys(db.dbStack)
  for (var i = 0, max = dbs.length; i < max; i++) {
    var dbType = dbs[i]
    destroyDb(dbType, db.dbStack[dbType])
  }
}
