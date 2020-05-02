<template>
  <div id="app" class="container my-3">
    <router-link to='/' exact>Home</router-link>

    <router-view v-bind:all_todos="all_todos"/>
  </div>
</template>

<script>
import { demo_data, local_storage } from './storage.js';
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
  }
}
</script>

<style>
</style>
