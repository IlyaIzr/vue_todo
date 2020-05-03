<template>
  <div class="container">

    <div v-for="list_item in current_list" :key="list_item.id">
      <List_item v-bind:list_item="list_item" v-on:del-todo-line="del_todo_line"/>
    </div>    
      
    <form class="list-group-item form-group" @submit="add_todo_line">
      <input type="text" class="form-control" name="new_line" placeholder="Добавьте новое дело"
        v-model="new_line" required>
      <button type="submit" class="btn btn-primary">Добавить</button>
    </form>

    <button type="submit" class="btn btn-info my-2" @click="$emit('add-todo', list_id, current_list)">Сохранить</button>
  </div>
</template>

<script>
import List_item from '../components/List_item.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "Edit_list",
  props: ["all_todos"],
  data() {
    const list_id = this.$route.params.id;
    const list_with_page_id = this.all_todos.find(element => element[0] == list_id);
    const current_list = list_with_page_id[1];

    return {
      list_id,
      current_list,
      new_line: ''
    }
  },  
  components: {
    List_item
  },
  methods: {
    del_todo_line(id) {
      const current_list = this.current_list.filter(list_item => list_item.id !== id);
      this.current_list = current_list;
    },
    add_todo_line(event) {
      event.preventDefault();
      
      const new_line_obj = {
        text: this.new_line,
        completed: false,
        id: uuidv4()
      } 
      this.current_list = [...this.current_list, new_line_obj];
    },
    //refresh_db(){
    //  console.log(this.current_list)
//
    //}
  }
}
//__ I stored list_id, 'cause there's no way edit and create_edit would go one after another, hence they'll refresh after visiting home.
</script>

<style>
</style>