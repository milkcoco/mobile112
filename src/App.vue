<script setup lang="ts">
import { ref } from "vue";
let drawer = ref(false);
let items=[
  {title:'國文', to: '/chinese'},
  {title:'英文', to: '/english'},
  {title:'地理', to: '/geography'},
  {title:'歷史', to: '/history'},
  {title:'生物', to: '/biology'},
  ]
// let items=[
//   {title:'國文', value:"Chinese"},
//   {title:'英文', value:"English"},
//   {title:'地理', value:"Geography"},
//   {title:'歷史', value:"History"},
//   {title:'生物', value:"Biology"},
//   ]
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar>
      <v-icon icon="plus"></v-icon>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">menu</v-app-bar-nav-icon>
        <v-app-bar-title>Application bar</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer floating permanent v-model="drawer">
      <v-list>
        <v-list-item v-for="item in items"
          :title="item.title" 
          :key="item.title" 
          :to="item.to">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column align-start justify-start mb-6" style="min-height: 300px;">
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
