'use strict'

const SCOPESPLIT = '|'
const KEYSPLIT = '.'
const BASEPREFIX = '$'

exports.generate = function dataKeyGenerate (key, scope, base) {
  base = (base && typeof base === 'string') ? base.toUpperCase() : 'ROOT'
  var returnVal = [BASEPREFIX + base]
  if (key instanceof Array) {
    key = key.join(KEYSPLIT)
  }
  var scopeKey = ''
  if (scope && ('' + scope).length > 0) {
    scopeKey += scope + SCOPESPLIT
  }
  if (key && key.length > 0) {
    scopeKey += key
  }
  if (scopeKey.length > 0) {
    returnVal.push(scopeKey)
  }
  return returnVal.join(KEYSPLIT)
}

exports.parse = function dataParseGenerate (key) {
  var parse = []
  var cur = -1
  var scopeSet = false
  var max
  var i
  for (i = 0, max = key.length; i < max; i++) {
    if (key.charAt(i) === BASEPREFIX || key.charAt(i) === SCOPESPLIT || key.charAt(i) === KEYSPLIT) {
      cur++
      parse[cur] = ''
      if (key.charAt(i) === SCOPESPLIT) {
        scopeSet = true
      }
    } else if (cur >= 0) {
      parse[cur] += key.charAt(i)
    }
  }
  i = 1
  var retVal = {
    base: parse[0].toLowerCase()
  }
  if (parse.length > 1) {
    if (scopeSet) {
      retVal.scope = parse[1]
      i++
    }
    for (max = parse.length; i < max; i++) {
      if (!retVal.keyEl) {
        retVal.keyEl = []
      }
      if (parse[i].length > 0) {
        retVal.keyEl.push(parse[i])
      }
    }
    if (retVal.keyEl && retVal.keyEl.length > 0) {
      retVal.key = retVal.keyEl.join(KEYSPLIT)
    } else {
      delete retVal.keyEl
    }
  }
  return retVal
}
