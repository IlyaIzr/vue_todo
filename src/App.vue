<template>
  <div id="app" class="container my-3">
    <router-view v-bind:all_todos="all_todos" v-on:add-todo="refresh_db" v-on:go-back="go_back"/>
  </div>
</template>

<script>
import { demo_data, local_storage } from './storage.js';
import router from './router';
let all_todos;

if (!local_storage['todo_lists']) {
  local_storage.setItem('todo_lists', JSON.stringify(demo_data));
  all_todos = demo_data;
} else {
  const retrieved_json = localStorage.getItem('todo_lists');
  all_todos = JSON.parse(retrieved_json);
}

export default {
  name: 'App',
  data() {
    return {
      all_todos
    }
  },
  methods: {
    refresh_db (id, todo_lines) {
      const untouched_todos = this.all_todos.find(element => element[0] !== id);
      const item_to_add = [id, todo_lines]
      this.all_todos = [untouched_todos, item_to_add];
      local_storage.setItem('todo_lists', JSON.stringify(this.all_todos));
      router.push({ path: '/' })
    },
    go_back () {
      const retrieved_json = localStorage.getItem('todo_lists');
      all_todos = JSON.parse(retrieved_json);
      console.log(all_todos[0][1])
      //current_list = prev_state[1];
      
      router.push({ path: '/' });
    }
  },
}

</script>

<style>

</style>
