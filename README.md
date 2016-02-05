# level

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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
