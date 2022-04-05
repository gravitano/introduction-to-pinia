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
  <div>
    <form @submit.prevent="onSubmit" autocomplete="off">
      <div v-if="error">
        {{ error }}
      </div>
      <div>
        <label> Email: </label>
        <input v-model="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label> Password: </label>
        <input v-model="password" type="password" placeholder="Password" />
      </div>
      <button>Login</button>
    </form>
  </div>
</template>

<style scoped></style>
