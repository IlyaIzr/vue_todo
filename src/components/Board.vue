<template>
  <div class="card-deck">
    <router-link class="card" 
      v-for="demo_item in board_props"
      :key="demo_item[0]"
      v-bind:to="'edit_'+demo_item[0]" exact
    >
      <div class="card-body">
        <div class="text-right">
          <button type="button" class="btn btn-primary board_modal_trigger " @click.prevent >
            Удалить
          </button>
          <div class="modal_container board_modal_container bg-dark" @click.prevent>
            <div class="modal_window bg-active">
              <div class="modal_message">Действительно удалить?</div>
              <hr>
              <div class="modal_buttons">
                <button class="btn btn-info board_modal_cancel" >Отменить</button>
                <button class="btn btn-danger" @click.prevent="$emit('del-list', demo_item[0])">Подтвердить</button>
              </div>
            </div>
          </div>
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
  .modal_container{
    display: none;
    position: fixed;
    z-index: 116;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    text-align: center;
  }
  .modal_window{
    position: fixed;
    top: 20%;
    left: 25%;
    width: 50%;
  }
  .modal_message{
    font-size: max(3vw, 3vh);
  }
  .modal_buttons button{
    margin: 0 1vw;
  }
  
</style>