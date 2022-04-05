<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const todo = useTodoStore();

const { addTodo, removeTodo } = todo;

const { todos, newTodo } = storeToRefs(todo);

const filter = ref('all');

const todoList = computed(() => {
  if (filter.value === 'completed') return todo.completed;
  if (filter.value === 'active') return todo.active;
  return todos.value;
});
</script>

<template>
  <main>
    <h1>Todo List</h1>

    <input type="text" name="newTodo" v-model="newTodo" />
    <button type="button" @click="addTodo">Add</button>

    <div class="filter">
      Filter:
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
        All
      </button>
      <button
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        Active
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Done
      </button>
    </div>

    <ul>
      <li v-for="(todo, index) in todoList" :key="index">
        <div>
          <input type="checkbox" v-model="todo.completed" />
          <span :class="{ done: todo.completed }"> {{ todo.title }}</span>
          <button @click="removeTodo(index)">&times;</button>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.filter {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.filter button {
  appearance: none;
  background-color: transparent;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
}
.filter button.active {
  background-color: darkcyan;
  color: white;
}

.done {
  text-decoration: line-through;
}
</style>
