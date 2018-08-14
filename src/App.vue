<template>
  <div id="app">
    <img src="./assets/logo.png" alt="" srcset="">
    <div class="wrapper">
      
      <m-date-picker v-model="date" :multi="true"
                     :markedGreen="currentShows"
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
    }
  },
  methods: {
    populateCurrentShows() {
      this.currentShows.push(new Date());
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.currentShows.push(tomorrow)
    }
  },
  mounted() {
    this.populateCurrentShows();
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
