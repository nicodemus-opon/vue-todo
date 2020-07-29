<template>
  <div class="t">
    <div class="input-group input-group-alternative mb-4">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i data-feather="plus" v-html="iconSvg4"></i>
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

    <ul class="list-group list-group-flush">
      <li
        class="list-group-item bg-transparent"
        :class="{completed:todo.completed}"
        v-for="todo in getTodos"
        :key="todo.id"
      >
        <a href="#" class="btn-icon pr-4 md-c"   v-on:click="toggleCompleted(todo)">
          <i class="text-default" v-html="iconSvg" data-feather="circle"></i>
        </a>

        <router-link
          :to="{ name: 'edit', params: { id: todo.id,todo } }"
          class="text-default"
          style="font-weight: 500;"
        >
          <span :class="todo.priority">#</span>
          <span v-if="todo.title.length<60">{{ todo.title}}</span>
          <span v-if="todo.title.length>=60">{{ todo.title.substring(0,60)+"..."}}</span>
        </router-link>
        <div class="pull-right">
          <router-link
          :to="{ name: 'edit', params: { id: todo.id,todo } }" href="#" class="btn-icon pr-2 md-cc">
            <i class="text-default" v-html="iconSvg2" data-feather="edit"></i>
          </router-link>

          <a href="#" class="btn-icon pr-2 md-cc" @click="removeTodo(todo.id)">
            <i class="text-default" v-html="iconSvg3" data-feather="trash"></i>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    feather.replace();
    $(".dis").html("Todo");
    
  },
  created() {

    this.$store.dispatch("retrieveTodos");
  },
  data() {
    return {
      newTodo: "",
      idForTodo: Math.floor(Math.random() * 1000000000),
      todos: this.$store.state.todos,
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.$store.dispatch("addTodos", {
        id: this.idForTodo,
        title: this.newTodo,
        uid:this.$store.state.user[0].uid,
      });

      this.newTodo = "";
      this.idForTodo++;
    },
    toggleCompleted(todo) {
      todo.completed=!todo.completed;
      console.log(todo);
      this.$store.dispatch("updateTodo", todo);
    },
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
  },
  computed: {
    getTodos() {
      return this.$store.getters.getTodos;
    },
   
    iconSvg: function (state) {
      return feather.icons.circle.toSvg();
    },
    iconSvg3: function (state) {
      return feather.icons.trash.toSvg();
    },
    iconSvg2: function (state) {
      return feather.icons.edit.toSvg();
    },
    iconSvg4: function (state) {
      return feather.icons.plus.toSvg();
    },
  },
};
</script>
<style scoped>
.completed {
  visibility: hidden;
  position: absolute;
}
</style>
