<template>
    <div class="calendar">
        <div class="month">
            <ul>
                <li class="prev"><i class="fa fa-fw fa-chevron-left" @click="subtractMonth"></i></li>
                <li class="next"><i class="fa fa-fw fa-chevron-right" @click="addMonth"></i></li>
                <li>{{month + ' - ' + year}}</li>
            </ul>
        </div>
        <ul class="weekdays">
            <li v-for="day in days" 
                :key="day">{{ day }}</li>
        </ul>
        <ul class="dates">
            <li v-for="blank in firstDayOfMonth"
                :key="blank">&nbsp;</li>
            <li v-for="date in daysInMonth" 
        		:class="{'active': date == initialDate &amp;&amp; month == initialMonth && year == initialYear}"
                :key="date">
                <span>{{ date }}</span>
           </li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    data(){
        return{
            today: moment(),
            dateContext: moment(),
            days: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        }
    },
    computed: {
        year: function () {
            var t = this;
            return t.dateContext.format('Y');
        },
        month: function () {
            var t = this;
            return t.dateContext.format('MMMM');
        },
        daysInMonth: function () {
            var t = this;
            return t.dateContext.daysInMonth();
        },
        currentDate: function () {
            var t = this;
            return t.dateContext.get('date');
        },
        firstDayOfMonth: function () {
            var t = this;
            var firstDay = moment(t.dateContext).subtract((t.currentDate - 1), 'days');
            return firstDay.weekday();
        },
        initialDate: function () {
            var t = this;
            return t.today.get('date');
        },
        initialMonth: function () {
            var t = this;
            return t.today.format('MMMM');
        },
        initialYear: function () {
            var t = this;
            return t.today.format('Y');
        }
    },
    methods: {
        addMonth: function () {
            var t = this;
            t.dateContext = moment(t.dateContext).add(1, 'month');
        },
        subtractMonth: function () {
            var t = this;
            t.dateContext = moment(t.dateContext).subtract(1, 'month');
        }
    }
}
</script>

<style scoped>
.month {
  padding: 0px 25px;
  width: 100%;
  text-align: center;
}

/* Month list */
.month ul {
  margin: 0;
  padding: 0;
}

.month ul li {
  /* color: #f2f2f2; */
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* Previous button inside month header */
.month .prev {
  float: left;
  padding-top: 0px;
}

/* Next button */
.month .next {
  float: right;
  padding-top: 0px;
}

.weekdays {
  margin: 0;
  padding: 10px 0;
  /* background-color:#ddd; */
}

.weekdays li {
  display: inline-block;
  width: 12.6%;
  color: #666;
  text-align: center;
  margin: 0.5%;
}

.dates {
  margin: 0;
}

.dates li {
  list-style-type: none;
    display: inline-block;
    width: 12.6%;
    text-align: center;
    margin-bottom: 5px;
    font-size: 12px;
    color: #777;
    background: #eee;
    margin: 0.5%;
    padding: 10px 0;
}

.active {
  background: #17b7a0 !important;
  color: white !important
}
</style>