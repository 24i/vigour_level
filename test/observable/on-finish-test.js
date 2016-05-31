'use strict'
const destroyAllDbs = require('../utils/destroy-dbs')
const test = require('tape')

module.exports = function testOnFinish (obs) {
  console.log('test on finish set')
  test.onFinish(function () {
    console.log(' ')
    console.log('FINISHED CLEANUP')
    console.log(' ')
    destroyAllDbs(obs.db.integral)
  })
}
