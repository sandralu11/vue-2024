<script setup>
import { ref } from 'vue'
const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    stock: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    stock: 15
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    stock: 30
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    stock: 10
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    stock: 25
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    stock: 20
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    stock: 18
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    stock: 20
  }
]
const drinks = ref(data)
const tempEdit = ref({
  id: '',
  name: '',
  description: '',
  price: '',
  stock: ''
})

function changeDrinkStock(id, stock) {
  //創建新陣列，存修改值
  drinks.value ==
    drinks.value.map((item) => {
      console.log(id)
      if (item.id === id) {
        item.stock = stock
      }
      return item
    })
}
const prepareEdit = (drink) => {
  tempEdit.value = { ...drink }
  console.log(tempEdit.value)
}
const confirmEdit = () => {
  const index = drinks.value.findIndex((item) => item.id === tempEdit.value.id)
  console.log(index, drinks.value)
  drinks.value[index].name = tempEdit.value.name
}
</script>
<template>
  <div class="week1">
    <h1>W1-餐點管理系統</h1>
    <table>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
          <th scope="col">修改品項</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="drink in drinks" :key="drink.id">
          <td>{{ drink.id }}</td>
          <td>{{ drink.name }}</td>
          <td>
            <small>{{ drink.description }}</small>
          </td>
          <td>{{ drink.price }}</td>
          <td>
            <button @click="changeDrinkStock(drink.id, drink.stock - 1)">-</button>
            {{ drink.stock }}
            <button @click="changeDrinkStock(drink.id, drink.stock + 1)">+</button>
          </td>
          <td>
            <button @click="prepareEdit(drink)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="tempEdit.id">
      <h2>編輯品項</h2>
      {{ tempEdit.id }}
      <input type="text" v-model="tempEdit.name" />
      <button type="button" @click="confirmEdit">確認</button>
      <button type="button" @click="tempEdit = {}">取消</button>
    </div>
  </div>
</template>

<style></style>
