import { defineStore } from 'pinia';

type TodoItem = {
  title: string;
  completed: boolean;
};

type TodoState = {
  todos: TodoItem[];
  newTodo: string;
};

export const useTodoStore = defineStore({
  id: 'todos',
  state: (): TodoState => ({
    todos: [],
    newTodo: '',
  }),
  getters: {
    completed: (state) => state.todos.filter((item) => item.completed),
    active: (state) => state.todos.filter((item) => !item.completed),
  },
  actions: {
    addTodo() {
      this.todos.push({
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = '';
    },
    removeTodo(index: number) {
      if (confirm('Are you sure want to delete this todo?')) {
        this.todos.splice(index, 1);
      }
    },
  },
});
