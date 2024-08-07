<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink> | <RouterLink to="/week1">第一週作業</RouterLink> |
        <RouterLink to="/week2">第二週作業</RouterLink> |
        <RouterLink to="/week3">第三週作業</RouterLink> |
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
