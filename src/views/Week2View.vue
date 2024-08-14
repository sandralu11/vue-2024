<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const api = 'https://todolist-api.hexschool.io'
const isShow = ref(true)
let isLogin = ref(false)
//註冊
const signupRes = ref('')
const messageSignup = ref('')
const signUp = ref({ email: '', password: '', nickname: '' })
const signupButton = async () => {
  try {
    console.log(`${api}/users/sign_up`)
    const res = await axios.post(`${api}/users/sign_up`, signUp.value)
    console.log(res)
    signupRes.value = res.data.uid
     alert('註冊成功');
    isShow.value=true
  } catch (error) {
    console.log(error)
    messageSignup.value = '驗證失敗: ' + error.response.data.message
  }
}
//登入
const signinRes = ref('')
const signIn = ref({ email: '', password: '' })
const messageSignIn = ref('')
const user = ref({
  nickname: '',
  uid: ''
})
const signinButton = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`, signIn.value)
    console.log(res)
    // cookie存token
    signinRes.value = res.data.token
    //寫入：cookie =token;到期日
    document.cookie = `todolistCookieName=${res.data.token}`
    isLogin.value = true
    user.value = res.data
  } catch (error) {
    messageSignIn.value = '驗證失敗: ' + error.message
    console.log(messageSignIn)
  }
}
//驗證登入
const myToken = document.cookie.replace(
  /(?:(?:^|.*;\s*)todolistCookieName\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
)

onMounted(async () => {
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        authorization: myToken
      }
    })
    user.value = res.data
    isLogin.value = true
    console.log(res)
  } catch (error) {
    console.log(error.message)
  }
})
//登出
const signoutButton = async () => {
  try {
    const res = await axios.post(
      `${api}/users/sign_out`,
      {},
      {
        headers: {
          authorization: myToken
        }
      }
    )
    console.log(res)
    isLogin.value=false
  } catch (error) {
    console.log(error.message)
  }
}

// todolist
const text = ref('')
const todos = ref([
  {
    text: '範例',
    id: 124,
    checked:false,
  }
])

const addTodo = () => {
  //新增文字匡內容至下方資料
  todos.value.push({
    text: text.value,
    id: new Date().getTime(),
    checked:false,
  })
  console.log(todos.value)
}
const deleteTodo = (item) => {
  console.log(item)
  const index = todos.value.findIndex((todo) => todo.id === item.id)
  console.log(index)
  todos.value.splice(index, 1)
}
</script>
<template>
  <h1>W2-串接 Todo List API</h1>
  <div class="week2 row justify-content-md-center bg-yellow">
    <div v-if="isLogin" class="text-end">
      <span class="p-3">{{ user.nickname }}的代辦</span>
      <button type="button" class="btn btn-outline-success me-2" @click.prevent="signoutButton">
        登出
      </button>
    </div>
    <div class="col-7 bg-light p-3" v-if="isLogin">
      <h1>TO DO LIST</h1>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="請輸入待辦事項"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          v-model="text"
        />
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addTodo">
          新增
        </button>
      </div>
      <div class="form-check">
        <div v-for="item in todos" :key="item.id" class="p-2">
          <input class="form-check-input" type="checkbox" id="gridCheck" v-model="item.checked"/>
          <label class="form-check-label" for="gridCheck">
            <span class="p-2" :class="{'text-decoration-line-through':item.checked}">
              {{ item.text }}
            </span>
            <button
              type="button"
              @click="deleteTodo(item)"
              class="btn btn-sm btn-outline-secondary"
            >
              X
            </button>
          </label>
        </div>
      </div>
    </div>
    <div class="col-md-8 ms-md-auto">
      <div class="col-md-7 mb-4" v-if="!isShow">
        <div class="card">
          <div class="card-body">
            <h2>註冊</h2>
            <form>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  v-model="signUp.email"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="signUp.password"
                />
                <label for="floatingPassword">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInputsignup"
                  placeholder="name@example.com"
                  v-model="signUp.nickname"
                />
                <label for="floatingInputsignup">nickname</label>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" type="button" @click="signupButton">
                  會員註冊
                </button>
                <button class="btn" @click.prevent="isShow = !isShow">回到登入頁面</button>
              </div>
              <p class="text-danger">{{ messageSignup }}</p>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-7 mb-4" v-if="isShow && !isLogin">
        <div class="card">
          <div class="card-body">
            <h2>登入</h2>
            <form>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInputsignIn"
                  placeholder="name@example.com"
                  v-model="signIn.email"
                />
                <label for="floatingInputsignIn">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="signIn.password"
                />
                <label for="floatingPassword">Password</label>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" type="button" @click="signinButton">
                  會員登入
                </button>
                <button class="btn" type="button" @click="isShow = !isShow">前往註冊</button>
              </div>
            </form>
            <p class="text-danger">{{ messageSignIn }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.week2 {
  height: 100vh;
  padding-top: 100px;
}
.bg-yellow {
  background-color: #ffd370;
}
</style>
