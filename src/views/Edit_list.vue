<template>
  <div class="container">
    Test, id is {{list_id}}
    <br>
    <div v-for="list_item in current_list" :key="list_item.id">
      <ul class="list-group">
        <li class="list-group-item" v-if="list_item.completed">
          <del>{{list_item.text}}</del>
          <input type="checkbox" name="" id={list_item.id} checked >
        </li>
        <li class="list-group-item" v-else>
          {{list_item.text}}
          <input type="checkbox" name="" id={list_item.id} >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "Edit_list",
  data() {
    return {
      list_id: this.$route.params.id
    }
  },  
  props: ["all_todos"],
  computed: {
    current_list: function () {    
      const list_with_page_id = this.all_todos.find(element => element[0] == this.list_id);
      return list_with_page_id[1];
    }
  }
}
//__ I stored list_id, 'cause there's no way edit and create_edit would go one after another, hence they'll refresh after visiting home.
</script>

<style>

</style>