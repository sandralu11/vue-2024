<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  name: String,
  price: Number,
  count: Number
})
</script>

<template>
  <td>{{ name }}</td>
  <td>{{ count }}</td>
  <td>${{ price * count }}</td>
</template>
