<template>
  <div class="container">
    <h2 class="btn btn-link text-primary" @click="go_back">Ко всем заметкам</h2>
    <br>
    <div class="inline_block">
      <button type="submit" class="btn btn-danger my-2" @click="open_modal_delete">Удалить</button>
      <button class="btn btn-info my2 ml-auto" @click="undo" :disabled="!canUndo">Отменить</button>
      <button class="btn btn-info my2 ml-auto" @click="redo" :disabled="!canRedo">Повторить</button>
    </div>
    
    <div class="form-group">
      <div class="list-group-item">
        <input type="text" class="form-control text-primary" placeholder="Название заметки (не обязательно)"
          v-model="title" required>
      </div>
      <div v-for="list_item in current_list" :key="list_item.id">
        <List_item  
          v-bind:list_item="list_item" 
          v-on:del-todo-line="del_todo_line"
          />
      </div>   
 
      
      <form class="list-group-item form-group" @submit.prevent="add_todo_line">
        <input type="text" class="form-control text-primary" name="new_line" placeholder="Добавьте новое дело"
          v-model="new_line" required>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </form>
    
    </div>

    <button type="submit" class="btn btn-secondary my-2" @click="open_modal" title="Сбросить все изменения">Сбросить</button>
    <Modal v-if="modal_is_open" v-on:confirmed="undo_all" v-on:declined="close_modal" v-bind:id="list_id"/>

    
      <Modal_delete v-if="modal_delete_is_open" v-on:confirmed="delete_list" v-on:declined="close_modal_delete"/>

    <button type="submit" class="btn btn-info my-2" @click="$emit('add-todo', list_id, current_list, title)">Сохранить</button>
    
  </div>
</template>

<script>
import List_item from '../components/List_item.vue';
import { v4 as uuidv4 } from 'uuid';
import router from '../router';
import Modal from '../components/Modal'; 
import Modal_delete from '../components/Modal_delete'; 
//import { session_storage } from '../storage';
import { local_storage } from '../storage';

export default {
  name: "Edit_list",
  props: ["all_todos"],
  data() {
    const list_id = this.$route.params.id;
    const list_with_page_id = this.all_todos.find(element => element[0] == list_id);
    const current_list = list_with_page_id[1];
    const title = list_with_page_id[2];
    
    const history = [Object.assign([], current_list)];
    const historyIndex = history.length - 1;

    return {
      list_id,
      title,
      current_list,
      new_line: '',
      history,
      historyIndex,
      modal_is_open: false,
      modal_delete_is_open: false
    }
  },  
  components: {
    List_item,
    Modal, Modal_delete
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
    undo_all () {
      console.log("undid");
      const retrieved_json = localStorage.getItem('todo_lists');
      const all_todos = JSON.parse(retrieved_json);
      const prev_state = all_todos.find(element => element[0] == this.list_id);
      this.current_list = prev_state[1];
      this.close_modal();
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
    },
    open_modal () {
      console.log("bebers")
      this.modal_is_open = !this.modal_is_open;
    },
    close_modal () {      
      this.modal_is_open = !this.modal_is_open;
    },
    open_modal_delete () {
      console.log("bebers")
      this.modal_delete_is_open = !this.modal_delete_is_open;
    },
    close_modal_delete () {      
      this.modal_delete_is_open = !this.modal_delete_is_open;
    },
    delete_list () {
      console.log("pushed")
      const rest_todos = this.all_todos.filter(element => element[0] !== this.list_id);
      this.all_todos = rest_todos;
      local_storage.setItem('todo_lists', JSON.stringify(this.all_todos));
      this.close_modal_delete();
      router.push({ path: '/' });
    },
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

<style scoped>
.btn-link{
  font-size: 2vw;
}
input[type="text"]{
  display: block;
  width: 100%;
}
</style>