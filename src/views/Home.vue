<template>
  <div class="container">
    <h1 class="primary my-3">Список дел</h1>
    <div class="card-deck">
      <Board v-bind:board_props="all_todos"/>
    </div>
  </div>
</template>

<script>
import Board from '../components/Board'; 

export default {
  name: "Home",
  components: {
    Board
  },
  props: ["all_todos"]
}
</script>

<style scoped>

</style>