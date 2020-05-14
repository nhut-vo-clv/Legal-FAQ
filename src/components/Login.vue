<template>
  <div>
    <h1>{{ msg }}</h1>   
    <el-button type="primary" icon="el-icon-pear" @click="GooogleLogin()">Google Login</el-button>
  </div>
  
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'Login',
  data () {
    return {
        msg: 'Login'
    }
  },
  methods: {
      GooogleLogin(){
        var provider = new firebase.auth.GoogleAuthProvider();
        //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            login_hint: 'user@one-line.com',
            hd: "one-line.com"
        });

        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log('this', this);
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            if(user) this.$router.replace('home');
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            alert('Ooops. ' + errorMessage);
        });
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
