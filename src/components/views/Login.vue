<template>
  <div class="login-body">
    <img src="../../assets/oneline-home-logo.png" alt="Oneline Directory" />

    <button class="social-btn-google fxac" type="button" @click="loginWithGoogle()">
      <i class="udi udi-google-plus social-icon"></i>
      Sign in with Google
      <span class="udi udi-circle-loader udi-small hidden"></span>
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

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
      provider.addScope("https://www.googleapis.com/auth/drive");
      provider.addScope("https://www.googleapis.com/auth/admin.directory.user.readonly");
      provider.addScope("https://www.googleapis.com/auth/cloud-platform");
      provider.setCustomParameters({
        login_hint: "user@one-line.com",
        hd: this.getDomain
      });

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          sessionStorage.setItem("user_token", token);
          var user = result.user;

          var ref = this.$db.collection(this.getUserInfoCollection);
          ref
            .where("email", "==", user.email)
            .get()
            .then(snapshot => {
              if (snapshot.docs.length > 0) {
                ref
                  .doc(snapshot.docs[0].id)
                  .update({
                    access_token: token
                  })
                  .then(result => {
                    this.$router.replace("home");
                  })
                  .catch(error => {
                    this.$commonFunction.alertError(error);
                  });
              } else {
                ref
                  .add({
                    access_token: token,
                    email: user.email
                  })
                  .then(result => {
                    this.$router.replace("home");
                  })
                  .catch(error => {
                    this.$commonFunction.alertError(error);
                  });
              }
            });
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
  },
  created() {
    if (firebase.auth().currentUser)
      this.msg =
        "Welcome " +
        firebase.auth().currentUser.displayName +
        " (" +
        firebase.auth().currentUser.email +
        ")";
  },
  computed: {
    ...mapGetters(["getUserInfoCollection", "getDomain"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-body {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}

/* Google Button CSS */
.social-btn-google {
  background-color: #fff;
  border: none;
  color: #686f7a;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(41, 48, 59, 0.24),
    0 0 2px 0 rgba(41, 48, 59, 0.12);
  border-radius: 2px;
  padding: 0 20px 0 10px;
  font-size: 16px;
  font-weight: 700;
  margin: 20px auto 0 auto;
}

.social-btn-google .udi-google-plus {
  background: url(../../assets/google-logo.svg) no-repeat 50%;
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

.fxac {
  display: flex;
  flex-direction: row;
  align-items: center;
}
/* Google Button CSS */
</style>
