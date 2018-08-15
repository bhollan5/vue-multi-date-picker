<template>
  <div id="app">
    <img src="./assets/logo.png" alt="" srcset="">
    <div class="wrapper">
      
      <m-date-picker v-model="date" :multi="true"
                     :markedGreen="currentShows"
                     :markedRed="yourShows"
      :disp="['日', '一', '二', '三', '四', '五', '六','年', '月', 'Cancel', 'OK']" >
      </m-date-picker>
      
<!--      To change the language to English, use this instead:-->
<!--
      <m-date-picker v-model="date" :multi="true"
      :lang="'en'" ></m-date-picker>
-->
      
      <div v-for="(item, index) in date" :key="index" class="sel-dates">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      date: [],
      currentShows: [],
      yourShows: []
    }
  },
  methods: {
    populateCurrentShows() {
      this.currentShows.push(new Date());
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.currentShows.push(tomorrow)
      var day1 = new Date();
      day1.setDate(day1.getDate() + 3);
      this.currentShows.push(day1);
    },
    populateYourShows() {
      var day1 = new Date();
      day1.setDate(day1.getDate() + 3);
      this.yourShows.push(day1);
      var day2 = new Date();
      day2.setDate(day2.getDate() + 5);
      this.yourShows.push(day2)
      var day3 = new Date();
      day3.setDate(day3.getDate() + 6);
      this.yourShows.push(day3)
    }
  },
  mounted() {
    this.populateCurrentShows();
    this.populateYourShows();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sel-dates{
  margin: 8px;
  font-size: 1.3rem;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
