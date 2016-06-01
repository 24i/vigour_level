# level
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/vigour-io/level.svg?branch=master)](https://travis-ci.org/vigour-io/level)
[![npm version](https://badge.fury.io/js/vigour-level.svg)](https://badge.fury.io/js/vigour-level)

Saving data from [observables](https://github.com/vigour-io/observable) (using `observable.set`) to LevelDB in Event Sourced style

## Base setup

```javascript
var Observable = require('vigour-observable')
var obs = new Observable({
  db: {
    inject: require('vigour-level'),
    name: 'dbName'
  }
})
```

## Properties

### period

Defines the period for the event databases following [ISO-8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) standards.

Possibilities:
| notation | result |
| -------- | ------ |
| `P1Y` | Period is one Year |
| `P2M` | Period is two Months |
| `P3W` | Period is three Weeks |
| `P4D` | Period is four Days |

Combinations are also possible, the order of defining is important thought (Year, Month, Week, Day)
For example:

- `P2Y2M` - Period of two years and two months
- `P2M1W` - Period of two Months and one week

### prefix

Prefix for the Database directory (will be: `prefix + name`)

### stamps

If you want to use your own stamps for `init` (after db is created), `ready` (after db is opened and all set data is loaded), which can be used for seperate listeners. For example see: `./test/observable/index.js`

The data should be an `object` and may contain keys: `init`, `ready`

## Order of defining properties

As Observable is event driven and the database will be opened and connected after setting propertie `name`. The `name` propertie should be set last.
Further ordering is not important.

## Full Setup

```javascript
const vstamp = require('vigour-stamp')
const Observable = require('vigour-observable')

var stamps = {
  init: vstamp.create(),
  ready: vstamp.create()
}

vstamp.on(stamps.init, function onInit () {
  console.log('init done')
})
vstamp.on(stamps.ready, function onReady () {
  console.log('db ready')
})

var obs = new Observable({
  db: {
    inject: require('vigour-level'),
    stamps: stamps,
    prefix: "example-",
    period: "P1W2D",
    name: 'database'
  }
})
```

