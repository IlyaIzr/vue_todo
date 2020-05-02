<template>
  <div>  
    <div v-for="list_item in list_props" :key="list_item.id" class="card-text">
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
  name: "To_do_item",
  props: ["list_props"]
}
</script>

<style>

</style>