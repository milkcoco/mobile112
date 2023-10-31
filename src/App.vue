<script setup lang="ts">
import English from "./components/EnglishDB.vue";
import Biology from "./components/BiologyDB.vue";
import History from "./components/HistoryDB.vue";
import Chinese from "./components/ChineseDB.vue";
import Geography from "./components/GeographyDB.vue";
//import ChemistryInput from "./components/ChemistryInput.vue";
//import ChemistryRadio from "./components/ChemistryRadio.vue";
import { reactive,ref } from "vue";
let drawer = ref(false);
let choice = reactive({title:'國文', value:"Chinese"});
let items=[
  {title:'國文', value:"Chinese"},
  {title:'英文', value:"English"},
  {title:'地理', value:"Geography"},
  {title:'歷史', value:"History"},
  {title:'生物', value:"Biology"},
  ]
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
          :key="item.value" 
          :active="item.value === choice.value"
          @click="choice.value = item.value">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column align-start justify-start mb-6" style="min-height: 300px;">
      <Suspense>
        <English v-if="choice.value === 'English'" />
        <Biology v-else-if="choice.value === 'Biology'"/>
        <History v-else-if="choice.value === 'History'"/>
        <Geography v-else-if="choice.value === 'Geography'"/>
        <Chinese v-else />
      </Suspense>
    </v-main>
  </v-app>
</template>
