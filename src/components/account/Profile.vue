<script setup lang="ts">
import { inject, reactive, watch } from 'vue';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import app from '@/components/settings/FirebaseConfig.vue'
import { FirebaseError } from '@firebase/util';

const db = getFirestore(app);
const login = inject('account', { name: '未登入', email: '', id:''  })
const account = reactive({
  name: login.name,
})

watch(login, () => {
  if (login.email!== ""){
    account.name = login.name
  }
  },{ 
    immediate: true

  })
  const state = reactive({
  message: '',
})
async function handleClick(){
  if (login.id === '') {
    state.message = '尚未登入無法更新'
    return
  }
  try{
    state.message = '更新中...'
    const userRef = doc(db, "user", login.id);
    await updateDoc(userRef, {
      name: account.name
    });
    state.message = '更新成功'
  } catch(e){
    if (e instanceof FirebaseError) {
      state.message = e.message
    }else{
      state.message = '更新失敗'
    }
  }
}
</script>
<template>
  <v-container>
    <v-text-field v-model=account.name label="姓名"></v-text-field>
    {{ state.message }}
    <v-btn color="primary" @click="handleClick">更新</v-btn>
    <v-btn color="secondary" >回首頁</v-btn>    
  </v-container>
</template>