<template>
  <div id="app" class="container my-3">
    <router-view 
      v-bind:all_todos="all_todos" 
      v-on:add-todo="refresh_db"
      />
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
    refresh_db (id, todo_lines, title) {
      const untouched_todos = this.all_todos.filter(element => element[0] !== id);
      const item_to_add = [id, todo_lines, title];
      untouched_todos.push(item_to_add);
      this.all_todos = untouched_todos;
      local_storage.setItem('todo_lists', JSON.stringify(this.all_todos));
      router.push({ path: '/' })
    }
  },
  updated: function () {
    const retrieved_json = localStorage.getItem('todo_lists');
    const current_todos = JSON.stringify(this.all_todos)
    if (current_todos !== retrieved_json) {
      all_todos = JSON.parse(retrieved_json);
      this.all_todos = all_todos;
    }
  }
}

</script>

<style>

</style>
