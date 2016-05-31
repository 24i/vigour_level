'use strict'

const isNumberLike = require('vigour-util/is/numberlike')

module.exports = function esParseValue (value) {
  if (value === 'string' && value[0] === '$' && value[1] === '.') {
    return value
  } else if (isNumberLike(value)) {
    return Number(value)
  } else if (value === 'false') {
    return false
  } else if (value === 'true') {
    return true
  } else if (value === 'undefined') {
    return ''
  }
  return value
}
