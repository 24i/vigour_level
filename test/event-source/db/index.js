'use strict'

const eventdb = require('../../../lib/event-source/db')
const period = 'P1D'
const dbName = 'test-event'

var db = new eventdb.Construct(dbName, period)
var allTheOperationsDone = {
  operations: {},
  callback: [],
  callbackExecuted: false,
  registerOperations: function (operations) {
    for (var i = 0, max = operations.length; i < max; i++) {
      allTheOperationsDone.operations[operations[i]] = false
    }
  },
  operationDone: function (operation) {
    allTheOperationsDone.operations[operation] = true
    var allIsDone = true
    var i
    var max
    for (i = 0, max = allTheOperationsDone.operations.length; i < max; i++) {
      if (allTheOperationsDone.operations[i] === false) {
        allIsDone = false
      }
    }
    if (allIsDone && allTheOperationsDone.callback && !allTheOperationsDone.callbackExecuted) {
      allTheOperationsDone.callbackExecuted = true
      for (i = 0, max = allTheOperationsDone.callback.length; i < max; i++) {
        allTheOperationsDone.callback[i]()
      }
    }
  },
  registerCallback: function (callback) {
    allTheOperationsDone.callback.push(callback)
  }
}

require('./period-calculation')
require('./db')(db, dbName, period)
require('./operations')(db, allTheOperationsDone)
require('./performance')(db, allTheOperationsDone)
