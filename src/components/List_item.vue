<template>
  <ul class="list-group">

    <li class="list-group-item">
      <input 
        type="checkbox" name="" :id="list_item.id" 
        v-on:change="complete_switch(list_item.id)"
        :checked="list_item.completed"
      >
      <input 
        type="text" name="rand_uid" :id="list_item.id+'a'" 
        v-bind:class="{'crossed':list_item.completed}"
        :value=list_item.text
      >
      <button class="btn btn-danger" @click="$emit('del-todo-line', list_item.id)">x</button>
    </li>    

  </ul>
</template>

<script>
export default {
  name: "List_item",
  props: ["list_item"],  
  methods: {
    complete_switch(){
      this.list_item.completed = !this.list_item.completed;
    }
  },
}
</script>

<style>
.crossed{
  text-decoration: line-through;
}

</style>