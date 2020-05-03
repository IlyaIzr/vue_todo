<template>
  <div class="card-deck">
    <router-link class="card" 
      v-for="demo_item in board_props"
      :key="demo_item[0]"
      v-bind:to="'edit_'+demo_item[0]" exact
    >
      <div class="card-body">
        <div class="text-right">
          <button type="button" class="btn btn-primary">
            Удалить
          </button>
        </div>
        <To_do_item class="card-text" v-bind:list_props="demo_item[1]"/>
      </div>
    </router-link>
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
  .card{
    z-index: 0;
  }
  .btn-primary{
    z-index: 999;
  }
</style>