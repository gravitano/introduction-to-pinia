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
  <div class="container mt-4">
    <h1>Profile</h1>

    <div>Name: {{ user?.name }}</div>
    <div>Email: {{ user?.email }}</div>

    <button class="mt-4 btn btn-danger" @click="logout">Logout</button>
  </div>
</template>

<style scoped></style>
