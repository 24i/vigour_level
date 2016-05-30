'use strict'

const eventdb = require('../../../lib/event-source/db')
const period = 'P1D'
const dbName = 'test-event'

var db = new eventdb.Construct(dbName, period)
var allTheOperationsDone = {
  operations: {},
  callback: false,
  callbackExecuted: false,
  registerOperations: function (operations) {
    for (var i = 0, max = operations.length; i < max; i++) {
      allTheOperationsDone.operations[operations[i]] = false
    }
  },
  operationDone: function (operation) {
    allTheOperationsDone.operations[operation] = true
    var allIsDone = true
    for (var i = 0, max = allTheOperationsDone.operations.length; i < max; i++) {
      if (allTheOperationsDone.operations[i] === false) {
        allIsDone = false
      }
    }
    if (allIsDone && allTheOperationsDone.callback && !allTheOperationsDone.callbackExecuted) {
      allTheOperationsDone.callbackExecuted = true
      allTheOperationsDone.callback()
    }
  },
  registerCallback: function (callback) {
    allTheOperationsDone.callback = callback
  }
}

require('./period-calculation')
require('./db')(db, dbName, period)
require('./operations')(db, allTheOperationsDone)
require('./performance')(db, allTheOperationsDone)
