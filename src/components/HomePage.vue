<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "HomePage",
  data() {
    return {
      msg: "Welcome to home page"
    };
  },

  methods: {},

  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: #fff;
  padding: 20px 0;
}
</style>
