'use strict'

const eventdb = require('../../../lib/event-source/db')
const period = 'P1D'
const dbName = 'test-event'

var db = new eventdb.Construct(dbName, period)

require('./period-calculation')
require('./db')(db, dbName, period)
require('./operations')(db)
