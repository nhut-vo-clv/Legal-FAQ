<template>
  <div class="hello">
    <h1>{{ msg }}</h1>   
    <el-button type="primary" round @click="signout()">Sign Out</el-button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'HomePage',
  data () {
    return {
      msg: '',
    }
  },
  
  methods: {
     signout(){
       firebase.auth().signOut().then(() => {
         this.$router.replace('login')
       })
     }, 
  },
 

  created() {
    console.log();
    if(firebase.auth().currentUser)
      this.msg = 'Welcome '+firebase.auth().currentUser.displayName + ' (' +firebase.auth().currentUser.email + ')'; 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
