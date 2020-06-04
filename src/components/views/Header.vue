<template>
  <div>
    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar">
        <ul class="list-unstyled components">
          <li>
            <router-link to="/home">HOME</router-link>
          </li>
          <li>
            <router-link to="/publish-inquiry">PUBLISHED FAQ</router-link>
          </li>
          <li>
            <router-link to="/make-request/-1">MAKE REQUEST</router-link>
          </li>
          <li>
            <router-link to="/inquiry">INQUIRY</router-link>
          </li>
          <li>
            <router-link to="/setting">SETTING</router-link>
          </li>
          <!-- <li>
            <router-link to="/drive-picker">Drive Picker</router-link>
          </li>-->
        </ul>
        <ul class="list-unstyled CTAs">
          <li>
            <!-- <el-button type="primary">Logout</el-button> -->
            <a href="#" @click="signout" class="download">SIGN OUT</a>
          </li>
        </ul>
      </nav>

      <!-- Page Content  -->
      <div id="content">
        <nav class="navbar navbar-expand-lg nav-c-1">
          <div class="container-fluid">
            <div class="nav-c-2">
              <img src="../../assets/logo.png" alt="Oneline Directory" class="app-logo" />
            </div>

            <div class="nav-c-3">
              <span class="displayName">{{userNm}}</span>
              <el-avatar :size="35" :src="photoURL"></el-avatar>
              <div class="wrap-bar-button">
                <div class="bar-container" @click="changeBar">
                  <div class="bar1"></div>
                  <div class="bar2"></div>
                  <div class="bar3"></div>
                </div>
              </div>

              <!-- <button type="button" id="sidebarCollapse" @click="openNav">
                <i class="fas fa-bars"></i>
              </button>-->
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div class="overlay" @click="dismissNav"></div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Header",
  computed: {
    currentPage() {
      return this.$router.path;
    }
  },
  data() {
    return {
      activeClass: "active",
      sampleAvatarURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userNm: ""
    };
  },
  methods: {
    openNav() {
      if (this.navActive) {
        $("#sidebar").removeClass("active");
        $(".overlay").removeClass("active");
        this.navActive = false;
      } else {
        $("#sidebar").addClass("active");
        $(".overlay").addClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
        this.navActive = true;
      }
    },

    dismissNav() {
      $("#sidebar").removeClass("active");
      $(".overlay").removeClass("active");
      this.navActive = false;
      this.$el.querySelector(".bar-container").classList.toggle("change");
    },

    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login"
          });
        });
    },

    changeBar() {
      //      x.classList.toggle("change");

      this.$el.querySelector(".bar-container").classList.toggle("change");
      if (this.navActive) {
        $("#sidebar").removeClass("active");
        $(".overlay").removeClass("active");
        this.navActive = false;
      } else {
        $("#sidebar").addClass("active");
        $(".overlay").addClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
        this.navActive = true;
      }
    }
  },

  created() {
    this.photoURL = this.sampleAvatarURL;
    if (firebase.auth().currentUser) {
      this.userNm = firebase.auth().currentUser.displayName;
      if (firebase.auth().currentUser.photoURL) {
        this.photoURL = firebase.auth().currentUser.photoURL;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .wrap-bar-button {
  display: inline-block;
} */
.wrap-bar-button {
  padding: 3px 0 0 10px;
}

.bar-container {
  display: inline-block;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 27px;
  height: 3px;
  background-color: #fff;
  margin: 5px 0 0 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-6px, 6px);
  transform: rotate(-45deg) translate(-6px, 6px);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-5px, -5px);
  transform: rotate(45deg) translate(-5px, -5px);
}

/*
    DEMO STYLE
*/

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.app-logo {
  height: 32px;
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.nav-c-1 {
  background-color: #bd0f72;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}

.nav-c-3 {
  display: flex;
  line-height: 26px;
}

.nav-c-3 > button {
  background-color: #bd0f72;
  border: none;
  vertical-align: middle;
}

.nav-c-3 > button > svg {
  color: #fff;
  font-size: 21px;
  margin-top: 5px;
}

.nav-c-3 > span {
  text-transform: uppercase;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

#sidebar {
  overflow: hidden !important;
  width: 250px;
  position: fixed;
  top: 50px;
  right: -250px;
  height: 100vh;
  z-index: 999;
  background: #bd0f72;
  color: #fff;
  transition: all 0.3s;
  overflow-y: scroll;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
}

#sidebar.active {
  /* left: 0; */
  right: 0;
}

#dismiss {
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background: #7386d5;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
}

#dismiss:hover {
  background: #800d4e;
  color: #7386d5;
}

.overlay {
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
.overlay.active {
  display: block;
  /* opacity: 1; */
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px 30px 10px;
  font-size: 1.1em;
  display: block;
  text-align: right;
}

#sidebar ul li a:hover {
  color: #fff;
  background: #800d4e;
}

#sidebar ul li a.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 0 20px;
}

ul.CTAs a {
  text-align: center !important;

  display: block;
  /* border-radius: 5px;
    margin-bottom: 5px; */
}

a.download {
  background: #eee;
  color: #2c3e50;
  padding: 6px !important;
  border-radius: 3px;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

.displayName {
  color: #fff;
  padding: 5px 10px;
}
</style>
