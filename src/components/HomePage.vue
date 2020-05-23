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
      msg: "WELCOME TO HOME PAGE"
    };
  },

  methods: {},

  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-size: 30px;
  font-weight: 600;
  padding: 40px;
  color: #bd0f72;
  text-align: center;
  background: #fff;
}
</style>
