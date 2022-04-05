<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const { user } = storeToRefs(auth);
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/');
};
</script>

<template>
  <div>
    <h1>Profile</h1>

    <h2>Name: {{ user?.name }}</h2>
    <h2>Email: {{ user?.email }}</h2>

    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped></style>
