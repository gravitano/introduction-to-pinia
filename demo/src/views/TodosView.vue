<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';

const todo = useTodoStore();

const { todos, newTodo, addTodo } = storeToRefs(todo);
</script>

<template>
  <main>
    <h1>Todo List</h1>

    <input type="text" name="newTodo" v-model="newTodo" />
    <button type="button" @click="addTodo">Add</button>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo.title }}
      </li>
    </ul>
  </main>
</template>
