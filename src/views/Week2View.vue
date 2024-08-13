<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const api = 'https://todolist-api.hexschool.io'

//註冊
const signupRes = ref('')
const signUp = ref({ email: '', password: '', nickname: '' })
const signupButton = async () => {
  try {
    console.log(`${api}/users/sign_up`)
    const res = await axios.post(`${api}/users/sign_up`, signUp.value)
    console.log(res)
    signupRes.value = res.data.uid
  } catch (error) {
    console.log(error)
    // alert('驗證失敗: ' + error.message);
    alert('驗證失敗: ' + error.response.data.message);
  }
}
//登入
const signinRes = ref('')
const signIn = ref({ email: '', password: '' })
const signinButton = async () => {
  try {
    // console.log(`${api}/users/sign_in`)
    const res = await axios.post(`${api}/users/sign_in`, signIn.value)
    console.log(res)
    // cookie存token
    signinRes.value = res.data.token
    //寫入：cookie =token;到期日
    document.cookie = `todolistCookieName=${res.data.token}`
  } catch (error) {
    alert('驗證失敗: ' + error.message);
  }
}
//驗證登入
const myToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)todolistCookieName\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
const user = ref({
  nickname: '',
  uid: ''
})
onMounted(async () => {
  try {
      const res = await axios.get(`${api}/users/checkout`, {
    headers: {
      authorization: myToken
    }
  })
  user.value = res.data
  } catch (error) {
    alert('驗證失敗: ' + error.message);
  }
})
//登出

const signoutButton = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`,{},{
      headers: {
        authorization: myToken
      }
    })
    console.log(res)
    alert('登出: ' + res.data.message);
  } catch (error) {
    alert('失敗: ' + error.message);
  }
}
</script>
<template>
  <div class="week2">
    <h1>W2-串接 Todo List API</h1>
    <h2>註冊</h2>
    <input type="mail" placeholder="e-mail" v-model="signUp.email" />
    <input type="text" placeholder="password" v-model="signUp.password" />
    <input type="text" placeholder="nickname" v-model="signUp.nickname" />
    <button type="button" @click="signupButton">註冊</button>
    {{ signUp }}
    {{ signupRes }}
    <h2>登入</h2>
    <input type="mail" placeholder="e-mail" v-model="signIn.email" />
    <input type="text" placeholder="password" v-model="signIn.password" />
    <button type="button" @click="signinButton">登入</button>
    {{ signIn }}
    token:{{ signinRes }}
    {{ user }}
    <h2>登出</h2>
    <button type="button" @click="signoutButton">登出</button>
    

  </div>
</template>

<style></style>
