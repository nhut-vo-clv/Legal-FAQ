<template>
<div>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <!-- <div id="dismiss" @click="dismissNav">
                <i class="fas fa-arrow-left"></i>
            </div> -->

            <!-- <div class="sidebar-header">
                <h3>Bootstrap Sidebar</h3>
            </div> -->

            <ul class="list-unstyled components">
               
                <li class="active">
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Portfolio</a>
                </li>
            
            </ul>

            <!-- <ul class="list-unstyled CTAs">
                <li>
                    <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Download source</a>
                </li>
                <li>
                    <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Back to article</a>
                </li>
            </ul> -->
        </nav>

        <!-- Page Content  -->
        <div id="content">

            <nav class="navbar navbar-expand-lg nav-c-1">
                <div class="container-fluid">
                    <div class="nav-c-2">
                        <button type="button" id="sidebarCollapse" @click="openNav">
                            <i class="fas fa-align-left"></i>
                        </button>
                        <img src="../assets/logo.png" alt="Oneline Directory" class="app-logo">
                    </div>

                    <div class="nav-c-3">
                         <el-avatar :size="35" :src="circleUrl"></el-avatar>
                    </div>
                    

                    

                    <!-- <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-align-justify"></i>
                    </button> -->

                    <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </nav>

      </div>

    </div>

    <div class="overlay" @click="dismissNav"></div>
</div>
</template>

<script>
export default {
  name: 'Header',
  data: {
      navActive: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  },
  methods: {
      openNav() {
        if(this.navActive){
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
            this.navActive = false;
            
        }else{
            $('#sidebar').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            this.navActive = true;
        }
       
      },
      
      dismissNav() {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
            this.navActive = false;

      }
  },

    created() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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


.navbar {
    /* padding: 15px 10px; */
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.nav-c-1 {
    background-color: #bd0f72;
}


.nav-c-2 > button {
    background-color: #bd0f72;
    border: none;
    vertical-align: middle;
}

.nav-c-2 > button > svg {
    color: #fff;
    font-size: 25px;
}

.nav-c-3 > span {
    border: none;
    vertical-align: middle;
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
    top: 62px;
    left: -250px;
    height: 100vh;
    z-index: 999;
    background: #bd0f72;
    color: #fff;
    transition: all 0.3s;
    overflow-y: scroll;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
}

#sidebar.active {
    left: 0;
}

#dismiss {
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #7386D5;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}

#dismiss:hover {
    background: #fff;
    color: #7386D5;
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

#sidebar .sidebar-header {
    padding: 20px;
    background: #6d7fcc;
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
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
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
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: #7386D5;
}

a.article,
a.article:hover {
    background: #6d7fcc !important;
    color: #fff !important;
}

</style>
