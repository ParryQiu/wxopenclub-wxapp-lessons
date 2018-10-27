const calendar = require('utils/calendar')

const start = 1901
const years = Array.from(new Array(200), (val, index) => index + start + '年')
const months = Array.from(new Array(12), (val, index) => index + 1 + '月')
const chinaMonths = Array.from(new Array(12), (val, index) => calendar.toChinaMonth(index + 1))

Component({
  externalClasses: ['picker-class'],
  properties: {
    value: {
      type: String,
      value: '',
      observer: '_init',
    },
    chinese: {
      type: Boolean,
      value: false,
      observer: '_init',
    },
  },
  lifetimes: {
    attached() {
      this._init()
    },
  },
  methods: {
    _bindchange(e) {
      this.setData({
        multiIndex: e.detail.value,
      })

      const value = e.detail.value
      const [y, m, d] = [value[0] + start, value[1] + 1, value[2] + 1]

      this.triggerEvent('change', {value: y + '-' + this._fill(m) + '-' + this._fill(d)})
    },
    _bindcolumnchange(e) {
      const multiArray = this.data.multiArray
      const multiIndex = this.data.multiIndex

      let y = multiIndex[0] + start
      let m = multiIndex[1] + 1

      multiIndex[e.detail.column] = e.detail.value

      if (e.detail.column === 0) {
        y = e.detail.value + start
      } else if (e.detail.column === 1) {
        m = e.detail.value + 1
      }

      if (this.data.chinese) {
        multiArray[2] = this._computedMonthDays(y, m)
      } else {
        multiArray[2] = this._computedSolarDays(y, m)
      }

      this.setData({
        multiArray,
        multiIndex,
      })
    },
    _bindcancel() {
      this._init()
    },
    _init() {
      let [y, m, d] = [0, 0, 0]

      if (this.data.value) {
        [y, m, d] = this.data.value.split('-')
          .map(Number)
      } else {
        const day = new Date();
        [y, m, d] = [day.getFullYear(), day.getMonth() + 1, day.getDate()]
      }

      if (this.data.chinese) {
        const day = this.data.value ? calendar.lunar2solar(y, m, d) : calendar.solar2lunar(y, m, d);
        [y, m, d] = [day.lYear, day.lMonth, day.lDay]
        const days = this._computedMonthDays(y, m)
        this.setData({
          multiArray: [years, chinaMonths, days],
          multiIndex: [y - start, m - 1, d - 1],
        })
      } else {
        const days = this._computedSolarDays(y, m)
        this.setData({
          multiArray: [years, months, days],
          multiIndex: [y - start, m - 1, d - 1],
        })
      }
    },
    _computedSolarDays(y, m) {
      const day = calendar.solarDays(y, m)
      return Array.from(new Array(day), (val, index) => {
        const date = index + 1
        const lunar = calendar.solar2lunar(y, m, date)
        return date + '日 ' + lunar.ncWeek
      })
    },
    _computedMonthDays(y, m) {
      const day = calendar.monthDays(y, m)
      return Array.from(new Array(day), (val, index) => calendar.toChinaDay(index + 1))
    },
    _fill(d) {
      return (d < 10 ? '0' : '') + d
    },
  },
})
