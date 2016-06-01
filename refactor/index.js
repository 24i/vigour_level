'use strict'

const Observable = require('vigour-observable')
const levelDb = require('./level-db')
const vstamp = require('vigour-stamp')
var stamps = {
  init: vstamp.create('init', 'outside'),
  ready: vstamp.create('ready', 'outside')
}

vstamp.on(stamps.init, function () {
  // ref.db.set({name: 'test2'})
  console.log('OUTSIDE INIT')
})
vstamp.on(stamps.init, function () {
  console.log('OUTSIDE READY')
})

var ref = new Observable({
  db: {
    inject: levelDb,
    stamps: stamps,
    name: 'test'
  }
})
console.log('levelDb.stamps', ref.db.stamps)
ref.set({
  a: 'a',
  c: {
    d: 'e'
  }
})
ref.a.set('b')
console.log('ref', ref)
