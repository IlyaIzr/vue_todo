<template>
  <ul class="list-group">

    <li class="list-group-item form-check">
      
    <div class="input-group-prepend py-1">
      <div class="input-group-text">
        <input 
          type="checkbox" name="" :id="list_item.id" class="mx-2"
          v-model="list_item.completed"
        >
      </div>
      <input 
        type="text" name="rand_uid" :id="list_item.id+'a'" class="form-control mx-2 text-primary"
        v-bind:class="{'crossed':list_item.completed}"
        v-model="list_item.text" 
        required
      >
      <button class="btn btn-danger mx-2" @click="$emit('del-todo-line', list_item.id)" title="удалить пункт">x</button>

    </div>
    </li>    

  </ul>
</template>

<script>
export default {
  name: "List_item",
  props: ["list_item"],
}
</script>

<style>
.crossed{
  text-decoration: line-through;
}

</style>