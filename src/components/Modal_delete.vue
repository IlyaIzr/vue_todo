<template>  
  <div class="modal_container board_modal_container" @click.prevent>
    <div class="modal_window bg-light  px-3">
      <div class="modal_message">Действительно удалить?</div>
      <hr>
      <div class="modal_buttons my-3">
        <button class="btn btn-info board_modal_cancel" @click="$emit('declined')">Отменить</button>
        <button class="btn btn-danger" @click="$emit('confirmed', id)">Подтвердить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["id"],

  //_Method to dev and debug accepted id
  //methods: {
  //  do_action (id) {
  //    console.log(id)
  //  }
  //}
}
</script>

<style>
  .modal_container{
    display: block;
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.329);
  }
  .modal_window{
    position: fixed;
    top: 20%;
    left: 25%;
    width: 50%;
    background-color: #fff;
    z-index: 999;
  }
  .modal_message{
    font-size: max(3vw, 3vh);
  }
  .modal_buttons button{
    margin: 0 1vw;
  }
</style>