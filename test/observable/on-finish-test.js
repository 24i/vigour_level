'use strict'
const destroyAllDbs = require('../utils/destroy-dbs')
const test = require('tape')

module.exports = function testOnFinish (obs) {
  console.log(' ')
  console.log('FINISHED CLEANUP')
  console.log(' ')
  destroyAllDbs(obs.db.esDb)
}
