<template>
  <div id="app">
    <Header class="fixed-header" v-if="this.$router.currentRoute.name !== 'Login'" />
    <router-view class="page-content"/>
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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

body {
  background: #eee;
}

.fixed-header {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 99;
}

.page-content {
  margin-top: 50px;
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
