import { demo_data, local_storage } from '../storage';
console.log(demo_data);
console.log(local_storage['todo_lists']);


const state = {
  todos: []
};

const getters = {
  get_todos: (state) => state.todos 
};

const actions = {
  fetchTodos({ commit }) {
    let todos_recieved

    if (!local_storage['todo_lists']) {
      local_storage.setItem('todo_lists', JSON.stringify(demo_data));
      todos_recieved = demo_data;
    } else {
      const retrieved_json = localStorage.getItem('todo_lists');
      todos_recieved = JSON.parse(retrieved_json);
    }

    commit('setTodos', todos_recieved)
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos)
};

export default {
  state,
  getters,
  actions,
  mutations
}