# level
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/vigour-io/level.svg?branch=master)](https://travis-ci.org/vigour-io/element)

Saving data from hub to LevelDB

```javascript
var Hub = require('vigour-hub')
var hub = new Hub({
  db: {
    inject: require('vigour-level'),
    name: 'dbName'
  }
})
```
