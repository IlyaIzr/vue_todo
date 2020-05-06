<template>
  <div class="container">
    <router-link class="card bg-light" 
      v-for="list_item in board_props"
      :key="list_item[0]"
      v-bind:to="'edit_'+list_item[0]" exact
    >
      <div class="card-body text-primary">
        <div class="inline my-2">
          <h3>{{list_item[2]}}</h3>
          <div class="text-right">          
            <button type="button" class="btn btn-primary board_modal_trigger" @click.prevent="open_modal(list_item[0])">
              Удалить
            </button>
          </div>
        </div>
        <To_do_item class="card-text" v-bind:list_props="list_item[1]"/>
      </div>
    </router-link>

    <router-link v-bind:to="'edit_'" exact>        
      <div class="primary text-center hov_targer">
        <h2 class="primary text-primary">Добавить</h2>
        <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 50 h 60 " stroke-width="5"/>
          <path d="M 50 20 v 60 " stroke-width="5"/>
        </svg>
      </div>
    </router-link>
    
    <Modal v-if="modal_is_open" v-bind:id="list_id" v-on:confirmed="del_list" v-on:declined="close_modal"/>
  </div>
</template>

<script>
import To_do_item from './To_do_item'; 
import { local_storage } from '../storage';
import Modal from './Modal'; 

export default {
  name: "Board",
  components: {
    To_do_item,
    Modal
  },
  data() {
    return {
      modal_is_open: false,
      list_id: ''
    }
  },
  props: ["board_props"],
  methods: {
    del_list (id) {
      console.log(id)
      const rest_todos = this.board_props.filter(element => element[0] !== id);
      this.board_props = rest_todos;
      local_storage.setItem('todo_lists', JSON.stringify(this.board_props));
      this.close_modal();
    },
    open_modal (id) {
      this.modal_is_open = !this.modal_is_open;
      this.list_id = id
    },
    close_modal () {      
      this.modal_is_open = !this.modal_is_open;
    }
  }
}

</script>

<style scoped>

.container{    
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3vh 3vw;
}
@media screen and (max-width: 1200px) {
  .container{    
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2vh;
  }
}
.inline{
  display: flex;
  justify-content: space-between;
}


path{
  stroke: lavender;
}
h2{
  margin-top: 2vw;
  font-size: max(3vw, 5vh);
}
svg{
  max-width: 200px;
}
.hov_targer{
  z-index: -1;
  opacity: .7;
  transition: 0.6s;
}
.hov_targer:hover{
  opacity: 1;
}

</style>