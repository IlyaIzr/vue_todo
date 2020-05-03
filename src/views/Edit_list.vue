<template>
  <div class="container">
    <br>
      <div v-for="list_item in current_list" :key="list_item.id">

        <List_item v-bind:list_item="list_item" v-on:del-todo-line="del_todo_line"/>

      </div>
  </div>
</template>

<script>
import List_item from '../components/List_item.vue';

export default {
  name: "Edit_list",
  props: ["all_todos"],
  data() {
    const list_id = this.$route.params.id;
    const list_with_page_id = this.all_todos.find(element => element[0] == list_id);
    const current_list = list_with_page_id[1];

    return {
      list_id,
      current_list
    }
  },  
  components: {
    List_item
  },
  methods: {
    del_todo_line(id) {
      console.log(this.current_list)
      const current_list = this.current_list.filter(list_item => list_item.id !== id);
      console.log(current_list)
      this.current_list = current_list;
    }
  }
}
//__ I stored list_id, 'cause there's no way edit and create_edit would go one after another, hence they'll refresh after visiting home.
</script>

<style>
</style>