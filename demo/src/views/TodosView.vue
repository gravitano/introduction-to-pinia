<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';

const todo = useTodoStore();

const { addTodo } = todo;

const { todos, newTodo } = storeToRefs(todo);
</script>

<template>
  <main>
    <h1>Todo List</h1>

    <input type="text" name="newTodo" v-model="newTodo" />
    <button type="button" @click="addTodo">Add</button>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <label>
          <input type="checkbox" v-model="todo.completed" />
          {{ todo.title }}
        </label>
      </li>
    </ul>
  </main>
</template>
