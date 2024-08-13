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
    console.log(error)
  }
}
//驗證登入
const user = ref({
  nickname: '',
  uid: ''
})
onMounted(async () => {
  //讀出
  var myToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)todolistCookieName\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  console.log(myToken)
  const res = await axios.post(`${api}/users/checkout`, {
    headers: {
      authorization: myToken
    }
  })
  console.log(res)
  user.value = res.data
})
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
  </div>
</template>

<style></style>
