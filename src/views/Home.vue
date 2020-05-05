<template>
  <div class="container">
    <h1 class="primary my-3">Список дел</h1>
    <div class="card-deck">
      <Board v-bind:board_props="all_todos" v-on:del-list="del_list"/>
      <router-link v-bind:to="'edit_'" exact>
      <div class="primary card text-center hov_targer">
        <h2 class="primary">Добавить</h2>
        <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 50 h 60 " stroke-width="5"/>
          <path d="M 50 20 v 60 " stroke-width="5"/>
        </svg>
      </div></router-link>
    </div>
  </div>
</template>

<script>
import Board from '../components/Board'; 
import { local_storage } from '../storage';

export default {
  name: "Home",
  components: {
    Board
  },
  props: ["all_todos"],
  methods: {
    del_list (id) {
      console.log(id)
      const rest_todos = this.all_todos.filter(element => element[0] !== id);
      this.all_todos = rest_todos;
      local_storage.setItem('todo_lists', JSON.stringify(this.all_todos));
    }
  }
}
</script>

<style scoped>
  path{
    stroke: lavender;
  }
  h2{
    margin-top: 2vw;
    font-size: max(3vw, 5vh);
  }
  svg{
    width: 100%;
    height: 100%;
  }
  .hov_targer{
    z-index: -1;
    opacity: .7;
    transition: 0.6s;

  }
  .hov_targer:hover{
    opacity: 1;
  }
</style>