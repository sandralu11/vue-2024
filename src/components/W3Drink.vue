<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  name: String,
  price: Number,
  description: String
})
</script>

<template>
  <div class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ name }}</h5>
      <small>${{ price }}</small>
    </div>
    <p class="mb-1">{{ description }}</p>
  </div>
</template>
