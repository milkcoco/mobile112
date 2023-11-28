<script setup lang="ts">
import { inject, reactive, watch } from 'vue';
import { doc, getFirestore, updateDoc, increment } from 'firebase/firestore';
import app from '@/components/settings/FirebaseConfig.vue'
import { FirebaseError } from '@firebase/app';

const db = getFirestore(app);

const login = inject('account', { name: '未登入', email: '', id: '', loginCount: 0, subjects: '' })
const account = reactive({
  name: login.name,
  id: login.id
})

watch(login, () => {
  if (login.email !== "") {
    account.name = login.name,
    account.id = login.id
  }
}, {
  immediate: true
})

const state = reactive({
  message: '',
})

const userRef = doc(db, "user", account.id);

await updateDoc(userRef, {
  loginCount: increment(1)
});

async function handleClick() {
  if (login.id === '') {
    state.message = '尚未登入無法更新'
    return
  }
  try {
    state.message = '更新中...'
    const userRef = doc(db, "user", login.id);
    await updateDoc(userRef, {
      name: account.name
    });
    state.message = '更新成功'
  } catch (e) {
    if (e instanceof FirebaseError) {
      state.message = e.message
    } else {
      state.message = '更新失敗'
    }
  }
}
</script>
<template>
  <v-container>
    <v-text-field v-model=account.name label="姓名"></v-text-field>
    {{ state.message }}
    <v-btn color="primary" @click="handleClick()">更新</v-btn>
    <v-btn color="secondary">回首頁</v-btn>
    <v-card class="mx-auto my-5" color="black" variant="outlined">
      <v-card-item>
        <div>
          <div class="text-subtitle-2 mb-1">
            目前進度：
          </div>
          <div class="text-h6 mb-1">
            你已完成的科目
          </div>
          <div class="text-subtitle-1">{{ login.subjects }}</div>
          <br/>
          <div class="text-h6 mb-1">
            你已完成的單元
          </div>
          <div class="text-subtitle-1">
            單元一 科學方法與生命現象
          </div>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn>
           登入次數：{{ login.loginCount }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>