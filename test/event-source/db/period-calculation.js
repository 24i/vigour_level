'use strict'

const periodCalculation = require('../../../lib/event-source/db/period-calculation')
const test = require('tape')

test('should calculate periods with year designator', function (t) {
  t.deepEqual(periodCalculation('P1Y', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2017, 0, 1, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P2Y', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2014, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P2Y', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P2Y', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P3Y', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2013, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P3Y', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P3Y', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P5Y', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P5Y', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P5Y', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0))})

  t.end()
})

test('should calculate periods with Month designator', function (t) {
  t.deepEqual(periodCalculation('P1M', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 3, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1M', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1M', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 5, 1, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P10M', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P10M', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 10, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P10M', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 8, 1, 0, 0, 0, 0))})

  t.end()
})

test('should calculate periods with Week designator', function (t) {
  t.deepEqual(periodCalculation('P1W', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 16, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1W', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 23, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1W', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 30, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P43W', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 2, 9, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P43W', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 0, 11, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P43W', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 10, 7, 0, 0, 0, 0))})
  t.end()
})

test('should calculate periods with Month designator', function (t) {
  t.deepEqual(periodCalculation('P1D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 25, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 26, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 27, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P5D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 20, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P5D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 25, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P5D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 30, 0, 0, 0, 0))})

  t.end()
})
