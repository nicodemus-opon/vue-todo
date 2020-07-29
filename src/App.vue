<template>
  <div id="app">
    <div class="container-fluid full-height">
      <div
        class="row justify-content-center"
        style="background-image:url(../src/assets/img/ty.jpg)"
      >
        <div class="col-lg-2 col-sm-1 bg-bg pt-5b pl-3" v-if="isLogin">
          <ul
            class="nav flex-column pt-5 d-md-block d-none d-lg-block pt-5"
            style="position: fixed;width: 12%;"
          >
            <h3 class="pb-5 pl-0">
              <img
                class="img rounded-circle"
                :src="getTodos.profile"
                style="height: 48px;width: 48px;"
              />
              <!--i
                class="rounded-circle bg-primary text-default p-2"
                data-feather="user"
                style="height: 48px;width: 48px;"
              ></i-->
              <span
                class="text-default"
                style="font-weight: 500;overflow: hidden;text-overflow: ellipsis;"
              >{{getTodos.username.substring(0,4)+".."}}</span>
            </h3>
            <li class="nav-item hvr-dark">
              <router-link
                to="/"
                class="nav-link text-default ml-0 pl-0"
                style="font-weight:500"
                href="#"
              >
                <i data-feather="home"></i>
                <span class="ml-3">Home</span>
              </router-link>
            </li>
            <li class="nav-item mt-3 hvr-dark">
              <router-link
                to="/important"
                class="nav-link text-default pl-0"
                style="font-weight:500"
                href="/"
              >
                <i class data-feather="star"></i>
                <span class="ml-3">Important</span>
              </router-link>
            </li>
            <li class="nav-item mt-3 hvr-dark">
              <router-link
                to="/completed"
                class="nav-link text-default pl-0 ml-0"
                style="font-weight:500"
                href="#"
              >
                <i data-feather="check"></i>
                <span class="ml-3">Completed</span>
              </router-link>
            </li>

            <li class="nav-item mt-3">
              <a class="nav-linkb btn btn-primary btn-block" v-on:click="logout()" href="#">
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="col-lg-10 cardb full-height">
          <div class="container full-height sticky-top">
            <div class="form-group pt-5">
              <div class="def mb-4">
                <h3 class="display-4 text-muted dis"></h3>
              </div>
              <div class="row d-flex d-lg-none" v-if="isLogin">
                <div class="col-6">
                  <h3 class="pb-5 pl-0">
                    <img
                      class="img rounded-circle"
                      :src="getTodos.profile"
                      style="height: 48px;width: 48px;"
                    />
                  </h3>
                </div>
                <div class="col-6 text-right">
                  <router-link to="/" class="text-default mr-2" href="#">
                    <i data-feather="home"></i>
                  </router-link>
                  <router-link to="/important" class="text-default mr-2" href="#">
                    <i data-feather="star"></i>
                  </router-link>
                  <router-link to="/completed" class="text-default mr-2" href="#">
                    <i data-feather="check"></i>
                  </router-link>
                </div>
              </div>
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
body {
  font-family: poppins !important;
}
#app {
  font-family: poppins !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style>
@import "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700";
@import "./assets/css/argon-design-system.css";
@import "./assets/css/main.css";

@import "https://use.fontawesome.com/releases/v5.0.6/css/all.css";

@import "./assets/css/nucleo-icons.css";
@import "./assets/css/nucleo-svg.css";

@import "./assets/css/font-awesome.css";
@import "./assets/css/nucleo-svg.css";

@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,700,400italic|Material+Icons";
</style>

<!--script>
import "./../node_modules/feather-icons/dist/feather.js";
feather.replace();
</script-->
<script>
import feather from "feather-icons";
import $ from "jquery";

export default {
  name: "app",
  data() {
    return {
      user: this.$store.state.user[0],
    };
  },
  mounted() {
    feather.replace();
    $(".alert").hide();
  },
  computed: {
    getTodos() {
      return this.$store.getters.getUser;
    },
    isLogin() {
      return this.$route.name != "login";
    },
   
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

