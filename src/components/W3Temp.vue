<script setup>
import { defineProps, defineEmits  } from 'vue'
const props = defineProps({
  name: String,
  price: Number,
  description: String,
  count:Number,
  deleteDrink:Function,
  index:Number
})
const emits = defineEmits(['change-count']);
const changeCount = (e) => {
    // console.log(e.target.value)
    emits('change-count', {count:e.target.value,index:props.index});
};
</script>

<template>
   <td>
    <button type="button" class="btn btn-sm" @click="deleteDrink">x</button>
    </td>
    <td>{{ name }}</td>
    <td>
    <small>{{ description }}</small>
    </td>
    <td>
    <select class="form-select" :value="count" @change="changeCount">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>
    </td>
    <td>${{ price }}</td>
    <td>${{ price * count }}</td>
</template>
