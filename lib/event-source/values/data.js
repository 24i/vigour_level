'use strict'

const vstamp = require('vigour-stamp')
const isNumberLike = require('vigour-util/is/numberlike')

exports.generate = function valueGenerate (value, stamp) {
  return JSON.stringify({
    val: value,
    stamp: stamp
  })
}

exports.parse = function valueParse (value) {
  value = JSON.parse(value)
  if (typeof value === 'object' && value.val) {
    var val = value.val
    if (val === 'string' && val[0] === '$' && val[1] === '.') {
      val = val.split('.')
    } else if (isNumberLike(val)) {
      val = Number(val)
    } else if (val === 'false') {
      val = false
    } else if (val === 'true') {
      val = true
    } else if (val === 'undefined') {
      val = ''
    }
    return {
      val: val,
      stamp: value.stamp || vstamp.create(false, 'data')
    }
  }
  return false
}
