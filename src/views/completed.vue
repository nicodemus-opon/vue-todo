<template>
  <div class="t">
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item bg-transparent"
        :class="{completed:todo.completed}"
        v-for="(todo) in getTodos"
       v-show="todo.completed"
        :key="todo.id"
      >
        <a class="btn-icon pr-4 md-c" v-on:click="toggleCompleted(todo)">
          <i class="text-default" v-html="iconSvg" data-feather="stop-circle"></i>
        </a>
<router-link
          :to="{ name: 'edit', params: { id: todo.id,todo } }"
           class="text-default"  style="font-weight: 500;">
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
     
mounted(){
    $(".dis").html("Completed");
    
},
  data() {
    return {
      newTodo: "",
      idForTodo: "2",
      disp:"Completed",
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
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
     toggleCompleted(todo) {
      todo.completed=!todo.completed;
      console.log(todo);
      this.$store.dispatch("updateTodo", todo);
    },
  },
  computed: {
    getTodos() {
      return this.$store.getters.getTodos;
    },
    iconSvg: function (state) {
      return feather.toSvg("stop-circle");
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

<style scoped>
  .completed {
    text-decoration:line-through;
}

</style>

