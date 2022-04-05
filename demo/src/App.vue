<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pinia</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              exact-active-class="active"
              aria-current="page"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/todo"
              class="nav-link"
              exact-active-class="active"
              aria-current="page"
            >
              Todo
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/users"
              class="nav-link"
              exact-active-class="active"
              aria-current="page"
            >
              Users
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link"
              exact-active-class="active"
              aria-current="page"
            >
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style></style>
