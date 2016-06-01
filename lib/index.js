const Observable = require('vigour-observable')
const eventSource = require('./event-source')

module.exports = new Observable({
  define: eventSource,
  properties: {
    prefix: true,
    period: true,
    maxSetValue: true,
    stamps: function (stamps) {
      if (typeof stamps === 'object' && (stamps.init || stamps.ready)) {
        this.stamps = stamps
      }
    },
    name: function nameProperties (name) {
      if (this.esDb) {
        this.esDb.close()
      }
      this.name = name
      this.init(name)
    }
  }
})
