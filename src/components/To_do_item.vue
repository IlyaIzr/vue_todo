<template>
  <div>  
    <ul class="list-group">
      <li class="list-group-item" v-for="list_item in list_props.slice(0, 3)" :key="list_item.id">
        <p v-if="list_item.completed">
          <del>{{list_item.text}}</del>
          <input type="checkbox" name="" id={list_item.id} checked >
        </p>

        <p v-else>
          {{list_item.text}}
          <input type="checkbox" name="" id={list_item.id} >
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "To_do_item",
  props: ["list_props"]
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  input{
    margin-left: .5em;
  }
  *{
    pointer-events: none;
  }
</style>