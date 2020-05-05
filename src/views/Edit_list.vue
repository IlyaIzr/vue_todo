<template>
  <div class="container">

    <div class="inline">
      <button type="submit" class="btn btn-dark my-2" @click="go_back">Назад</button>
      <div class="text-right">
        <button class="btn btn-info my2" @click="undo" :disabled="!canUndo">Отменить</button>
        <button class="btn btn-info my2" @click="redo" :disabled="!canRedo">Повторить</button>
      </div>
    </div>

    <div v-for="list_item in current_list" :key="list_item.id">
      <List_item 
        v-bind:list_item="list_item" 
        v-on:del-todo-line="del_todo_line"
        v-on:switch-complete="complete_switch"
        />
    </div>    
      
    <form class="list-group-item form-group" @submit.prevent="add_todo_line">
      <input type="text" class="form-control" name="new_line" placeholder="Добавьте новое дело"
        v-model="new_line" required>
      <button type="submit" class="btn btn-primary">Добавить</button>
    </form>

    <button type="submit" class="btn btn-secondary my-2" @click="undo_all" title="Сбросить все изменения">Сбросить</button>
    <button type="submit" class="btn btn-info my-2" @click="$emit('add-todo', list_id, current_list)">Сохранить</button>
    
  </div>
</template>

<script>
import List_item from '../components/List_item.vue';
import { v4 as uuidv4 } from 'uuid';
import router from '../router';
//import { session_storage } from '../storage';

export default {
  name: "Edit_list",
  props: ["all_todos"],
  data() {
    const list_id = this.$route.params.id;
    const list_with_page_id = this.all_todos.find(element => element[0] == list_id);
    const current_list = list_with_page_id[1];
    
    const history = [Object.assign([], current_list)];
    const historyIndex = history.length - 1;

    return {
      list_id,
      current_list,
      new_line: '',
      history,
      historyIndex
    }
  },  
  components: {
    List_item
  },
  methods: {
    del_todo_line(id) {
      const current_list = this.current_list.filter(list_item => list_item.id !== id);
      this.current_list = current_list;
      this.log(this.current_list)
    },
    add_todo_line() {
      const new_line_obj = {
        text: this.new_line,
        completed: false,
        id: uuidv4()
      } 
      this.current_list = [...this.current_list, new_line_obj];
      this.new_line = '';
      this.log(this.current_list)
    },    
    log: function(current_list) {
      this.historyIndex += 1
      this.history.splice(this.historyIndex)
      this.history.push(Object.assign([], current_list))
    },
    complete_switch(id){
      const new_list = JSON.parse(JSON.stringify(this.current_list))
      const line_index = new_list.findIndex(line => line.id === id);
      new_list[line_index].completed = !new_list[line_index].completed;
      this.current_list = new_list;
      this.log(this.current_list)
    },
    undo_all () {
      const retrieved_json = localStorage.getItem('todo_lists');
      const all_todos = JSON.parse(retrieved_json);
      const prev_state = all_todos.find(element => element[0] == this.list_id);
      this.current_list = prev_state[1];
    },
    go_back () {
      router.push({ path: '/' })
    },
    undo () {
      if (this.canUndo) {
        this.historyIndex -= 1
        this.current_list = this.history[this.historyIndex]
      }
    },    
    redo () {
      if (this.canRedo) {
        this.historyIndex += 1
        this.current_list = this.history[this.historyIndex]
      }
    }
  },
  mounted: function () {
  },
  beforeUpdate: function () {
  },
  destroyed: function () {
    console.log("destroyed")
  },
  computed: {
    canUndo: function() {
      return this.historyIndex > 0
    },
    canRedo: function() {
      return this.history.length - 1 - this.historyIndex > 0
    }
  },
}


</script>

<style>
</style>