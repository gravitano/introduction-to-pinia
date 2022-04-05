<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');

const auth = useAuthStore();

const router = useRouter();

const onSubmit = () => {
  error.value = '';
  const res = auth.login(email.value, password.value);
  if (res) {
    router.push('/profile');
  } else {
    error.value = 'Invalid credentials';
  }
};
</script>

<template>
  <div class="container mt-4">
    <form @submit.prevent="onSubmit" autocomplete="off">
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <div class="mb-3">
        <label for="email" class="mb-1"> Email: </label>
        <input
          id="email"
          v-model="email"
          class="form-control"
          type="email"
          placeholder="Email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="mb-1"> Password: </label>
        <input
          id="password"
          v-model="password"
          class="form-control"
          type="password"
          placeholder="Password"
        />
      </div>
      <button class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
