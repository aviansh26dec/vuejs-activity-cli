<template>
  <div id="appContainer">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ watchAppName }}</h1>
        </div>
      </div>
    </nav>
    
    <NavBar />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate @activity-created="addActivity" :categories="categories" />
        </div>
        <div class="column is-9">
          <Calendar />
          <div class="box content" :class="{fetching: isFetching, 'has-error': isError}">
            <div v-if="isError">
              {{ isError }}
            </div>
            <div v-else>
              <div v-if="isFetching">
                Loading.....
              </div>
              <div v-else>
                <ActivityItem v-for="act in activities" 
                          :act="act"
                          :key="act.id"
                          :ctime="convertTime(act.createdAt)"
                />
                <div class="activity-length">Currently {{ activitiesLength }} activities.</div>
                <div class="activity-motivation">{{ activityMotivation }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ActivityItem from '@/components/ActivityItem';
import ActivityCreate from '@/components/ActivityCreate';
import NavBar from '@/components/NavBar';
import Calendar from '@/components/Calendar';
import { fetchActivities, fetchCategories } from '@/api';

export default {
  name: 'App',
  components: {
    ActivityItem,
    ActivityCreate,
    NavBar,
    Calendar
  },
  data() {
    return {
          creator: 'Filip John',
          appName: 'Activity Planner',
          watchAppName: 'Activity Planner by Avinash Singh',
          items: {1: {name: 'Filip'}, 2: {name: 'John'}},
          user: {
            name: 'Filip Jerga',
            id: '-Aj34jknvncx98812',
          },
          isFetching: false,
          isError: null,
          activities: {},
          categories: {}
        }
  },
  computed: {
    fullAppName(){
      return this.appName + ' by ' + this.creator;
    },
    activitiesLength(){
      return Object.keys(this.activities).length;
    },
    activityMotivation(){
      if(this.activitiesLength && this.activitiesLength < 5){
        return 'Nice to see some goals (:';
      }else if(this.activitiesLength >= 5){
        return 'So many activites! Good Job!';
      }else{
        return 'No activites, so sad :(';
      }
    }
  },
  watch: {
    creator(val){
      this.watchAppName = this.appName + ' by ' + val;
    },
    appName(val){
      this.watchAppName = val + ' by ' + this.creator;
    }
  },
  beforeCreate(){
    console.log('beforeCreate called!');
  },
  created(){
    this.isFetching = true;
    fetchActivities().then(({...activities}) => {
      this.activities = activities;
      this.isFetching = false;
    }).catch((err) => {
      this.isError = err;
      this.isFetching = false;
    });
    this.categories = fetchCategories();
  },
  updated(){
    // console.log(this.activities, 'activities')
  },
  methods: {
    convertTime (time) {
      var date1 = new Date(time);
      var date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays + ' days';
    },
    addActivity (newActivity) {
      this.activities[newActivity.id] = newActivity;
      // Vue.set
      // Vue.set(this.activities, newActivity.id, newActivity);
      // console.log(newActivity, 'newActivity');
    }
  }
}
</script>

<style>
#appContainer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body {
  font-family: 'Open Sans', serif;
  background: #F2F6FA;
}
footer {
  background-color: #F2F6FA !important;
}
.activity-length {
  display: inline-block;
}
.activity-motivation {
  float: right;
}
.example-wrapper {
  margin-left: 30px;
}
.fetching{
  border: 2px solid orange;
}
.has-error{
  border: 2px solid red;
}
.topNav {
  border-top: 5px solid #3498DB;
}
.topNav .container {
  border-bottom: 1px solid #E6EAEE;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li{
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
</style>
