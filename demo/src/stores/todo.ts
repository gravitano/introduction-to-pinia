import { defineStore } from 'pinia';

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: [],
    newTodo: '',
  }),
  getters: {
    completed: (state) => state.todos.filter((item) => item.completed),
  },
  actions: {
    addTodo() {
      this.todos.push({
        title: this.newTodo,
      });
      this.newTodo = '';
    },
  },
});
