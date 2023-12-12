<script setup lang="ts">
import { provide, reactive, readonly, ref } from 'vue'
import app from '@/components/settings/FirebaseConfig.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from './router'
import {doc,getDoc ,getFirestore} from "firebase/firestore"

let drawer = ref(false)
let items = [
  { title:'登入', to:'/account'},
  { title: '國文', to: '/chinese' },
  { title: '英文', to: '/english' },
  { title: '地理', to: '/geography' },
  { title: '歷史', to: '/history' },
  { title: '生物', to: '/biology' }
]

const account = reactive({
  name: '未登入',
  email: ''
})

const db =getFirestore(app);
const auth = getAuth(app)
const unsub = onAuthStateChanged(auth, async (user)=>{
  if (user) {
    account.name='已登入'
    account.email = user.email?user.email:''
    
    const userDoc = await getDoc(doc(db, "user", user.uid));

    if (userDoc.exists()) {
      account.name = userDoc.data().name? userDoc.data().name:''
    }
    else{
      account.name = '未登入'
    }
  }
  else{
    account.name='未登入'
    account.email = ''
  }
  return () => {
    unsub();
  }}
);

provide(/* key */ 'account', /* value */ readonly(account))
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar>
      <v-icon icon="plus"></v-icon>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">menu</v-app-bar-nav-icon>
      <v-app-bar-title>Application bar {{ account.email }}</v-app-bar-title>
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
        <!-- <English v-if="choice.value === 'English'" />
        <Biology v-else-if="choice.value === 'Biology'"/>
        <History v-else-if="choice.value === 'History'"/>
        <Geography v-else-if="choice.value === 'Geography'"/>
        <Chinese v-else /> -->
      </Suspense>
    </v-main>
  </v-app>
</template>