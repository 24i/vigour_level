'use strict'

const multiplications = {
  months: {
    years: 12
  },
  weeks: {
    years: 52,
    months: 52 / 12
  },
  days: {
    years: 365.25,
    months: 365.25 / 12,
    weeks: 7
  }
}

var calculateAmountWithAlreadySetAmounts = function calculateAmountWithAlreadySetAmounts (type, amount, setAmount) {
  var newAmount = 0 + amount
  var setAmountKeys = Object.keys(setAmount)
  if (multiplications[type]) {
    for (var i = 0, max = setAmountKeys.length; i < max; i++) {
      if (multiplications[type][setAmountKeys[i]]) {
        newAmount += multiplications[type][setAmountKeys[i]] * setAmount[setAmountKeys[i]]
      }
    }
  }
  return newAmount
}

var getCurIsoWeek = function getCurIsoWeek (date) {
  var target = new Date(date.valueOf())
  var dayNr = date.getUTCDay()
  target.setUTCDate(target.getUTCDate() - dayNr + 3)
  var firstThursday = target.valueOf()
  target.setUTCMonth(0, 1)
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7)
  }
  return 1 + Math.ceil((firstThursday - Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate(), 0, 0, 0, 0)) / 604800000)
}

var ordinalDays = {
  0: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  1: [0, 31, 60, 91, 1212, 152, 182, 213, 244, 274, 305, 335]
}

var getMonthViaOrdinalDay = function getMonthViaOrdinalDay (days, isLeap) {
  var month
  var ordinalDay
  isLeap = (isLeap) ? 1 : 0
  for (var i = 0, max = ordinalDays[isLeap].length; i < max; i++) {
    if (ordinalDays[isLeap][i] < days) {
      month = i
      ordinalDay = ordinalDays[isLeap][i]
      break
    }
  }
  return {
    month: month,
    ordinalDay: ordinalDay
  }
}

var getDayOfWeek = function getDayOfWeek (year, week, dayOfWeek) {
  week = week || 1
  dayOfWeek = dayOfWeek || 1
  var januaryFourth = new Date(Date.UTC(year, 0, 4, 0, 0, 0, 0)).getUTCDay()
  if (januaryFourth === 0) {
    januaryFourth = 7
  }
  var dayNumber = (week * 7) + dayOfWeek - januaryFourth - 3
  if (dayNumber <= 0) {
    if ((new Date((year - 1), 1, 29)).getMonth() === 1) {
      dayNumber = 366 + dayNumber
    } else {
      dayNumber = 365 + dayNumber
    }
    year--
  }
  var ordinalDateData = getMonthViaOrdinalDay(dayNumber, (new Date(year, 1, 29)).getMonth() === 1)
  return new Date(Date.UTC(year, ordinalDateData.month, (dayNumber - ordinalDateData.ordinalDay), 0, 0, 0, 0))
}

var notations = {
  periods: {
    'all': 'YMWD',
    'Y': function periodYear (amount, add, date, dates) {
      var startYear = (Math.floor(dates.start.getUTCFullYear() / amount) + add) * amount
      dates.start = new Date(Date.UTC(startYear, 0, 1, 0, 0, 0, 0))
      dates.set.years = amount
      return dates
    },
    'M': function periodMonth (amount, add, date, dates) {
      var setAmount = calculateAmountWithAlreadySetAmounts('months', amount, dates.set)
      var startMonth = (Math.floor((date.getUTCFullYear() * 12 + date.getUTCMonth()) / setAmount) + add) * setAmount
      dates.start = new Date(Date.UTC(Math.floor(startMonth / 12), (startMonth % 12), 1, 0, 0, 0, 0))
      dates.set.months = amount
      return dates
    },
    'W': function periodWeek (amount, add, date, dates) {
      var setAmount = calculateAmountWithAlreadySetAmounts('weeks', amount, dates.set)
      var startWeek = (Math.floor((date.getUTCFullYear() * 52 + getCurIsoWeek(date)) / setAmount) + add) * setAmount
      var theDate = getDayOfWeek(startWeek / 52)
      theDate.setUTCDate(theDate.getUTCDate() + ((startWeek % 52) - 1) * 7)
      dates.start = new Date(Date.UTC(theDate.getUTCFullYear(), theDate.getUTCMonth(), theDate.getUTCDate(), 0, 0, 0, 0))
      dates.set.weeks = amount
      return dates
    },
    'D': function periodDay (amount, add, date, dates) {
      var setAmount = calculateAmountWithAlreadySetAmounts('days', amount, dates.set)
      var startDay = (Math.floor((date.getUTCFullYear() * 365.25 + date.getUTCMonth() * 30.4375 + date.getUTCDate()) / setAmount) + add) * setAmount
      dates.start = new Date(Date.UTC(Math.floor(startDay / 365.25), Math.floor((startDay % 365.25) / 30.4375), Math.ceil(((startDay % 365.25) % 30.4375)), 0, 0, 0, 0))
      dates.set.days = amount
      return dates
    }
  },
  time: {
    all: ''
  }
}

module.exports = function periodCalculation (period, add, date) {
  add = add || 0
  date = date || new Date()
  var dates = {
    start: date,
    set: {}
  }
  var amount = ''
  var curType = ''
  for (var i = 0, max = period.length; i < max; i++) {
    if (period.charAt(i).toUpperCase() === 'P') {
      curType = 'periods'
    } else if (period.charAt(i).toUpperCase() === 'T') {
      curType = 'time'
    } else if (isNaN(parseInt(period.charAt(i), 10))) {
      for (var d = 0, dMax = notations[curType].all.length; d < dMax; d++) {
        if (period.charAt(i) === notations[curType].all.charAt(d)) {
          dates = notations[curType][period.charAt(i)](parseInt(amount, 10), add, date, dates)
          amount = ''
          break
        }
      }
    } else {
      amount += period.charAt(i)
    }
  }
  return dates.start
}
