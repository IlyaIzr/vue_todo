<template>
  <div id="app" class="container my-3">
    <router-view v-bind:all_todos="get_todos" v-on:add-todo="refresh_db"/>
    <div v-for="(string) in get_todos" :key="string">
      {{string}}
    </div>
  </div>
</template>

<script>
import { demo_data, local_storage } from './storage.js';
import router from './router';
import { mapGetters, mapActions } from 'vuex';
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
    ...mapActions(['fetchTodos'])
  },
  updated: function () {
    const retrieved_json = localStorage.getItem('todo_lists');
    const current_todos = JSON.stringify(this.all_todos)
    if (current_todos !== retrieved_json) {
      all_todos = JSON.parse(retrieved_json);
      this.all_todos = all_todos;
    }
  },
  created: function (){
    this.fetchTodos();
  },
  computed: mapGetters(['get_todos'])
}

</script>

<style>

</style>
