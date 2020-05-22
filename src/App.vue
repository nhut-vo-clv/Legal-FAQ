<template>
  <div id="app">
    <Header v-if="this.$router.currentRoute.name !== 'Login'" />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

body {
  background: #eee;
}

/* .el-button--primary {
  color: #fff;
  background-color: #bd0f72;
  border-color: #bd0f72;
}

.el-button--primary:hover {
  color: #fff;
  background-color: #bd0f72;
  border-color: #bd0f72;
} */
</style>
