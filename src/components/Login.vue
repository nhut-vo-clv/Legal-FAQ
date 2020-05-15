<template>
  <div>
    <img src="../assets/oneline-home-logo.png" alt="Oneline Directory" class="app-logo center-login-page" />
    <button
      class="social-btn social-btn-google js-google-btn shadowed-btn fxac"
      type="button"
      @click="loginWithGoogle()"
    >
      <i class="udi udi-google-plus social-icon"></i>
      Sign in with Google
      <span class="udi udi-circle-loader udi-small hidden"></span>
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      msg: "Login"
    };
  },
  methods: {
    loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      provider.setCustomParameters({
        login_hint: "user@one-line.com",
        hd: "one-line.com"
      });

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log("this", this);
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          if (user) this.$router.replace("home");
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          alert("Ooops. " + errorMessage);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background-color: #eee;
}

.social-btn-google {
  background-color: #fff;
  border: none;
  color: #686f7a;
}

.social-btn {
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(41, 48, 59, 0.24),
    0 0 2px 0 rgba(41, 48, 59, 0.12);
  border-radius: 2px;
  margin-top: 10px;
  padding: 0 20px 0 10px;
  font-size: 16px;
  font-weight: 700;
}

.social-btn-google .udi-google-plus {
  background: url(../assets/google-logo.svg) no-repeat 50%;
  background-size: 24px;
  border: none !important;
  display: inline-block;
  font-size: 20px;
  font-weight: 400;
  margin-right: 10px;
  padding: 24px 0 24px 5px;
  text-align: center;
  width: 50px;
}

.loginbox-v4 .shadowed-btn {
  font-weight: 700;
}

.fxac {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.center-login-page {
  margin-top: 100px;
}
</style>
