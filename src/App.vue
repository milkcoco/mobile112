<script setup lang="ts">
import { provide, reactive, readonly, ref } from 'vue'
import app from '@/components/settings/FirebaseConfig.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from './router';

let drawer = ref(false)
let items = [
  { title: '國文', to: '/chinese' },
  { title: '英文', to: '/english' },
  { title: '地理', to: '/geography' },
  { title: '歷史', to: '/history' },
  { title: '生物測驗', to: '/biology' }
]

const account = reactive({
  name: '未登入',
  email: ''
})

const auth = getAuth(app)
const unsub = onAuthStateChanged(auth, (user) => {
  if (user) {
    account.name = '已登入'
    account.email = user.email ? user.email : ''
    console.log(user)
  } else {
    account.name = '未登入'
    account.email = ''
  }
  return () => {
    unsub()
  }
})

provide(/* key */ 'account', /* value */ readonly(account))

function goAccount(){
  router.push('/account')
}
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar>
      <v-icon icon="plus"></v-icon>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">menu</v-app-bar-nav-icon>
      <v-app-bar-title>Application bar</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" v-if="account.email === ''" @click="goAccount">請先登入</v-btn>
      <v-btn variant="outlined" v-else-if="account.email != ''" @click="goAccount">登出</v-btn>
    </v-app-bar>
    <v-navigation-drawer floating permanent v-model="drawer">
      <v-list>
        <v-list-item v-for="item in items" :title="item.title" :key="item.title" :to="item.to">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column align-start justify-start mb-6" style="min-height: 300px">
      <Suspense>
        <RouterView />
      </Suspense>
    </v-main>
  </v-app>
</template>
