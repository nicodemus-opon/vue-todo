<template>
  <div>
    <div class="form">
      <div class="row">
        <div class="col-md-6">
          <h4 class="text-muted pb-2"> </h4>
          <div class="form-group">
            <div class="input-group input-group-alternative mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i data-feather="align-left"></i>
                </span>
              </div>
              <input class="form-control form-control-alternative" v-model="todo.title" placeholder="Title" type="text" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <div class="input-group input-group-alternative mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i data-feather="calendar"></i>
                </span>
              </div>
              <input v-model="todo.due_date"
                type="date"
                class="form-control form-control-alternative"
                placeholder="Date Due"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <div class="input-group input-group-alternative mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i data-feather="clock"></i>
                </span>
              </div>
              <select class="form-control" v-model="todo.priority">
                <option value="priority-2">Priority - Normal</option>
                <option value="priority-1">Priority - High</option>
                <option value="priority-3">Priority - Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <textarea
            class="form-control form-control-alternative"
            v-model="todo.description"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Description"
          ></textarea>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <button class="btn btn-primary btn-block"  v-on:click="update(todo)" > Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    $(".dis").html("Edit");
    feather.replace();
  },
  data() {
    return {
      id: 0,
      todo: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.todo = this.$route.params.todo;
  },
  methods:{
    update(todo) {
       if (todo.description.trim().length == 0) {
        todo.description=" "
      }
      console.log(todo);
      this.$store.dispatch("updateTodo", todo);
      this.$router.push('/') 

    }
  },
};
</script>

<style scoped>
</style>