<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-5 ">
        <div class="card bg-secondary shadow border-0">
          <div class="card-header bg-white pb-5 text-center">
            <i
                      class="rounded-circle bg-primary text-default p-2"
                      data-feather="user"
                      style="height: 78px;width: 78px;font-weight:500 !important;"
                    ></i>
                    <h3 class=" text-default pb-0 pt-2 bold">Todo Auth</h3>
          </div>
          <div class="card-body px-lg-5 py-lg-5">
            <div class="text-muted text-center mb-3">
              <small>Log In with</small>
            </div>
            <div class="text-center">
              <a href="#" class="btn btn-neutral btn-block text-dark btn-icon" v-on:click="login()" >
                <span class="btn-inner--icon">
                  <img src="../assets/img/icons/common/google.svg" />
                </span>
                <span class="btn-inner--text">Google</span>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch("login");
    },
  },
};
</script>

<style scoped>
</style>