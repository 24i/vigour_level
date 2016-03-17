# level
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/vigour-io/level.svg?branch=master)](https://travis-ci.org/vigour-io/level)
[![npm version](https://badge.fury.io/js/vigour-level.svg)](https://badge.fury.io/js/vigour-level)

Saving data from observables to LevelDB

```javascript
var Observable = require('vigour-observable')
var obs = new Observable({
  db: {
    inject: require('vigour-level'),
    name: 'dbName'
  }
})
```
