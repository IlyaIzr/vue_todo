<template>
  <div class="card-deck">
    <div class="card" v-for="demo_item in board_props" 
    :key="demo_item[0]">    
      <router-link v-bind:to="'edit_'+demo_item[0]" exact>
        <div class="card-body">
          <To_do_item v-bind:list_props="demo_item[1]"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import To_do_item from './To_do_item'; 

export default {
  name: "Board",
  components: {
    To_do_item
  },
  props: ["board_props"]
}
</script>

<style scoped>

</style>