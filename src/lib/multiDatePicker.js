
export default {
  name: 'mDatePicker',
  data() {
    return {
      panelShow: true,
      seleDate: new Date(),
      seleYear: new Date().getFullYear(),
      seleMonth: new Date().getMonth(),
      
      monthNames: ["Jan", 
                   "Feb", 
                   "Mar", 
                   "Apr", 
                   "May", 
                   "June", 
                   "July", 
                   "Aug", 
                   "Sept", 
                   "Oct", 
                   "Nov", 
                   "Dec"],
    }
  },
  props: {
    multi:{
      type: Boolean,
      default: true,
    },
    // This will be what's v-modelled
    value:{
      type: Array|String| Date,
      default: []
    },
    // Takes an array of dates where there are already shows
    markedBlue: {
      type: Array,
      default: []
    },
    // Takes an array of dates where there are already requests
    markedRed: {
      type: Array,
      default() {
        return []
      }
    },
    lang: {
      type: String,
      default: 'zh'
    },
    disp: {
      type: Array,
      default: function (){ 
        if (this.lang === 'en') {
          return ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat','Year', 'Month', 'Cancel', 'OK']
        } else {
          return ['日', '一', '二', '三', '四', '五', '六','年', '月', '取消', '确定']
        }
      }
    },
  },
  computed: {
    renderCalendar: function () {
      let firDay = 0 - (new Date(this.seleYear, this.seleMonth, 1).getDay()) + 1
      let res = []
      for (let i = firDay, index = 0; index < 42; i++ , index++) {
        let day = new Date(this.seleYear, this.seleMonth, i, 8)
        let calObj = {
          label: day.getDate(),
          date: day,
          iscur: day.getMonth() === this.seleMonth
        }
        res.push(calObj)
      }
      return res
    },
    selected: function () { return this.value },
    display: function () {
      var d = this.disp
      return {
        days: d.slice(0,7),
        year: d[7],
        month: d[8],
        cancel: d[9],
        ok: d[10]
      }
    }
  },
  methods: {
    selectIndex: function (item) {
      if (!this.multi || !this.selected) {
        return -1
      }
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].getTime() == item.date.getTime()) {
          return i
        }
      }
      return -1
    },
    markBlue: function (item) {
      if (!this.multi || !this.markedBlue) {
        return -1
      }
      for (let i = 0; i < this.markedBlue.length; i++) {
        
//        console.log(this.markedBlue[i].getDate(), item.date.getDate());
        
        if (this.markedBlue[i].getDate() == item.date.getDate()
           && this.markedBlue[i].getMonth() == item.date.getMonth()
           && this.markedBlue[i].getYear() == item.date.getYear()) {
//          console.warn(this.markedBlue[i].getDate() == item.date.getDate())

          return i
        }
      }
      return -1
    },
    markRed: function(item) {
      if (!this.multi || !this.markedRed) {
        return -1
      }
      for (let i = 0; i < this.markedRed.length; i++) {
                
        if (this.markedRed[i].getDate() == item.date.getDate()
           && this.markedRed[i].getMonth() == item.date.getMonth()
           && this.markedRed[i].getYear() == item.date.getYear()) {
          return i
        }
      }
      return -1
    },
    cancelSelect: function () {
      if (this.multi) {
        this.selected.splice(0, this.selected.length)
      } else {
        this.selected = null
      }
      this.panelShow = false
    },
    toggleSelect: function (item) {
      if (!this.multi) {
        this.submitSelect(item.date)
      } else {
        if (this.markRed(item) >= 0) {
          return;
        }
        let index = this.selectIndex(item)
        if (index < 0) {
          this.selected.push(item.date)
        } else {
          this.selected.splice(index, 1)
        }
      }
    },
    submitSelect: function (value) {
      this.$emit('input', value)
      this.panelShow = false
    },
    changeMonth(num) {
      if (this.seleMonth + num > 11) {
        this.seleMonth = 0
        this.seleYear++
      } else if (this.seleMonth + num < 0) {
        this.seleMonth = 11
        this.seleYear--
      } else {
        this.seleMonth += num
      }
    }
  }
}