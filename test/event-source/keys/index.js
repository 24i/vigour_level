'use strict'

const keys = require('../../../lib/event-source/keys')
const test = require('tape')

test('create keys', function (t) {
  t.plan(2)
  t.equal('', keys.generate ('', '', '')
})

test('parse keys', function (t) {

})
