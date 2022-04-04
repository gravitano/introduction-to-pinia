<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>

<template>
  <main>
    <h1>Count: {{ counter.counter }}</h1>

    <h3>Getter: {{ counter.doubleCount }}</h3>

    <button type="button" @click="counter.decrement">Decrement</button>
    <button type="button" @click="counter.increment">Increment</button>
  </main>
</template>
