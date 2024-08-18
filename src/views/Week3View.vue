<script setup>
import {  ref,computed  } from 'vue'

const data = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60
  }
]
const drinks = ref(data)
const tempItem = ref([])
//複製點擊商品function
const prepareItem=(drink)=>{
  const found = tempItem.value.find((e)=>e.id===drink.id)
  if(found){
    const index = tempItem.value.findIndex((e) => e.id === drink.id)
   if(found.count<10){
      tempItem.value[index].count+=1
   }else{
    tempItem.value[index].count+=0
   }
  }else{
    tempItem.value.push({ ...drink , count:1}) 
  }
}
const tempTotal=computed(()=>{
  let drinkPrice=0
  tempItem.value.forEach(e => {
    drinkPrice += e.price*e.count
  });
  return drinkPrice
})
//刪除品項
const deleteDrink = (item) => {
  const index = tempItem.value.findIndex((drink) => drink.id === item.id)
  tempItem.value.splice(index, 1)
}
//送單
const remark=ref()
const drinkList = ref({
  drinkItems:"",
  drinkRemark:"",
  drinkTotal:""
})
const submitIist =(subtempItem,remark,tempTotal)=>{
  drinkList.value.drinkItems=[...subtempItem]
  drinkList.value.drinkRemark=remark
  drinkList.value.drinkTotal=tempTotal
  // drinkList.value.drinkItems={...tempItem.value}
  // drinkList.value.drinkRemark=remark.value
  // drinkList.value.drinkTotal=tempTotal.value
}
</script>
<template>
  <div class="week3">
    <h1>W3-餐點管理工具</h1>
    <div id="root">
    <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="list-group">
          <div v-for="drink in drinks" :key="drink.id" @click="prepareItem(drink)">
            <div class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between" >
                <h5 class="mb-1">{{ drink.name }}</h5>
                <small>${{ drink.price }}</small>
              </div>
              <p class="mb-1">{{ drink.description }}</p>
            </div>
        </div>
        </div>
      </div>
      <div class="col-md-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="50">操作</th>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col" width="90">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tempItem" :key="item.id">
              <td><button type="button" class="btn btn-sm" @click="deleteDrink">x</button></td>
              <td>{{ item.name }}</td>
              <td><small>{{item.description}}</small></td>
              <td>
                <select class="form-select" v-model="item.count">
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
              <td>${{item.price}}</td>
              <td>${{item.price*item.count}}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-end mb-3">
          <h5>總計: {{ tempTotal }}<span></span></h5>
        </div>
        <textarea
          class="form-control mb-3"
          rows="3"
          placeholder="備註"
          v-model="remark"
        ></textarea>
        <div class="text-end">
          <button class="btn btn-primary" :disabled="tempItem.length<1" @click="submitIist(tempItem,remark,tempTotal)">送出</button>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>訂單</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">品項</th>
                    <th scope="col">數量</th>
                    <th scope="col">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="item in drinkList.drinkItems" :key="item.id">
                    <td>{{ item.name}}</td>
                    <td>{{ item.count }}</td>
                    <td>{{ item.price*item.count }}</td>
                  </tr>

                </tbody>
              </table>
              <div class="text-end">備註: {{ drinkList.drinkRemark }}<span></span></div>
              <div class="text-end">
                <h5>總計: <span>${{ drinkList.drinkTotal }}</span></h5>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

