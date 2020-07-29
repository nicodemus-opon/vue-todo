<template>
  <div class="container-fluid full-height">
    <div class="row justify-content-centerb">
      <div class="col-lg-2 col-sm-1 bg-bg pt-5b pl-3">
        <ul
          class="nav flex-column pt-5 d-md-block d-none d-lg-block pt-5"
          style="position: fixed;width: 12%;"
        >
          <h3 class="pb-5 pl-0">
            <i
              class="rounded-circle bg-primary text-default p-2"
              data-feather="user"
              style="height: 48px;width: 48px;"
            ></i>
            <span
              class="text-default"
              style="font-weight: 500;overflow: hidden;text-overflow: ellipsis;"
            >Nico</span>
          </h3>
          <li class="nav-item hvr-dark">
            <a class="nav-link text-default ml-0 pl-0" style="font-weight:500" href="#">
              <i data-feather="home"></i>
              <span>Home</span>
            </a>
          </li>
          <li class="nav-item mt-3 hvr-dark">
            <a class="nav-link text-default pl-0" style="font-weight:500" href="#">
              <i class data-feather="star"></i>
              <span>Important</span>
            </a>
          </li>
          <li class="nav-item mt-3 hvr-dark">
            <a class="nav-link text-default pl-0 ml-0" style="font-weight:500" href="#">
              <i data-feather="check"></i>
              <span>Completed</span>
            </a>
          </li>

          <li class="nav-item mt-3">
            <a class="nav-linkb btn btn-primary btn-block" href="#">
              <span>Log out</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="col-lg-10 cardb full-height">
        <div class="container full-height">
          <div class="form-group pt-5 sticky-top">
            <div class="def">
              <h3 class="display-4 text-muted">My TO-DO</h3>
            </div>
            <div class="row d-flex d-lg-none">
              <div class="col-6">
                <h3 class="pb-5 pl-0">
                  <i
                    class="rounded-circle bg-primary text-default p-2"
                    data-feather="user"
                    style="height: 48px;width: 48px;font-weight:500 !important;"
                  ></i>
                  <span class="text-default">User</span>
                </h3>
              </div>
              <div class="col-6 text-right">
                <a class="text-default mr-2" href="#">
                  <i data-feather="home"></i>
                </a>
                <a class="text-default mr-2" href="#">
                  <i data-feather="star"></i>
                </a>
                <a class="text-default mr-2" href="#">
                  <i data-feather="check"></i>
                </a>
              </div>
            </div>

            <div class="input-group input-group-alternative mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i data-feather="plus"></i>
                </span>
              </div>
              <input
                class="form-control form-control-alternative"
                placeholder="Add a Task"
                type="text"
                v-model="newTodo"
                @keyup.enter="addTodo"
              />
            </div>
          </div>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item bg-transparent"
              :class="{completed:todo.completed}"
              v-for="(todo,index) in todos"
              :key="todo.id"
            >
              <a href="#" class="btn-icon pr-4 md-c" v-on:click="todo.completed=!todo.completed">
                <i class="text-default" v-html="iconSvg" data-feather="circle"></i>
              </a>

              <a class="text-default" href="#" style="font-weight: 500;">
                <span :class="todo.priority">#</span>
                <span v-if="todo.title.length<60">{{ todo.title}}</span>
                <span v-if="todo.title.length>=60">{{ todo.title.substring(0,60)+"..."}}</span>
              </a>
              <div class="pull-right">
                <a href="#" class="btn-icon pr-2 md-cc">
                  <i class="text-default" v-html="iconSvg2" data-feather="edit"></i>
                </a>

                <a href="#" class="btn-icon pr-2 md-cc" @click="removeTodo(index)">
                  <i class="text-default" v-html="iconSvg3" data-feather="trash"></i>
                </a>
              </div>
            </li>
          </ul>
          <div
            class="alert fixed-bottom align-middle notification bg-primary text-default mx-5"
            style="width: 80%;position: absolute;"
          >
            <i data-feather="check"></i>
            <span>Successfully Added task</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
      idForTodo: "2",
      todos: this.$store.state.todos,
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.$store.state.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        priority: "priority-2",
      });

      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.$store.state.todos.splice(index, 1);
    },
  },
  computed: {
    iconSvg: function (state) {
      return feather.toSvg("circle");
    },
    iconSvg3: function (state) {
      return feather.toSvg("trash");
    },
    iconSvg2: function (state) {
      return feather.toSvg("edit");
    },
  },
};
</script>

