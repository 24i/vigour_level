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

test('should calculate periods with Day designator', function (t) {
  t.deepEqual(periodCalculation('P1D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 25, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 26, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 27, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P5D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 20, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P5D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 25, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P5D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 4, 30, 0, 0, 0, 0))})

  t.end()
})

test('should calculate periods with Year and Month designator', function (t) {
  t.deepEqual(periodCalculation('P1Y1M', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1M', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 1, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1M', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2017, 2, 1, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P2Y3M', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2013, 9, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P2Y3M', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 0, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P2Y3M', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0))})

  t.end()
})

test('should calculate periods with Year and Week designator', function (t) {
  t.deepEqual(periodCalculation('P1Y1W', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2014, 11, 29, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1W', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 0, 11, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1W', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2017, 0, 16, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P3Y4W', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2012, 3, 16, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P3Y4W', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 4, 11, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P3Y4W', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2018, 5, 11, 0, 0, 0, 0))})

  t.end()
})

test('should calculate periods with Year and Day designator', function (t) {
  t.deepEqual(periodCalculation('P1Y1D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2014, 6, 1, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 6, 2, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 6, 3, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P4Y5D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2010, 10, 10, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P4Y5D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2014, 10, 15, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P4Y5D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2018, 10, 20, 0, 0, 0, 0))})

  t.end()
})

test('should calculate periods with Year, Month and Day designator', function (t) {
  t.deepEqual(periodCalculation('P1Y1M1D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2014, 7, 29, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1M1D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2015, 8, 30, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y1M1D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 10, 1, 0, 0, 0, 0))})

  t.deepEqual(periodCalculation('P1Y2M3D', -1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2014, 11, 2, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y2M3D', false, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2016, 1, 5, 0, 0, 0, 0))})
  t.deepEqual(periodCalculation('P1Y2M3D', 1, new Date(2016, 4, 26, 10, 45, 20, 100)), {start: new Date(Date.UTC(2017, 3, 8, 0, 0, 0, 0))})

  t.end()
})
