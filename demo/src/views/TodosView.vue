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
  <main class="container mt-4">
    <h1>Todo List</h1>

    <div class="d-flex mb-3">
      <input
        class="form-control"
        placeholder="Type..."
        type="text"
        name="newTodo"
        v-model="newTodo"
      />
      <button class="btn btn-primary" type="button" @click="addTodo">
        Add
      </button>
    </div>

    <div class="nav nav-pills d-flex align-items-center mb-3">
      <span class="me-3">Filter:</span>
      <a
        href="#"
        class="nav-link"
        :class="{ active: filter === 'all' }"
        @click.prevent="filter = 'all'"
      >
        All
      </a>
      <a
        href="#"
        class="nav-link"
        :class="{ active: filter === 'active' }"
        @click.prevent="filter = 'active'"
      >
        Active
      </a>
      <a
        href="#"
        class="nav-link"
        :class="{ active: filter === 'completed' }"
        @click.prevent="filter = 'completed'"
      >
        Done
      </a>
    </div>

    <ul class="list-group">
      <li
        v-for="(todo, index) in todoList"
        :key="index"
        class="list-group-item"
      >
        <div class="d-flex align-items-center">
          <input type="checkbox" v-model="todo.completed" />
          <span class="mx-2 flex-grow-1" :class="{ done: todo.completed }">
            {{ todo.title }}</span
          >
          <button class="btn btn-danger" @click="removeTodo(index)">
            Delete
          </button>
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
