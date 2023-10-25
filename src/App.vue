<script setup lang="ts">
import Chinese from "./components/ChineseDB.vue";
import English  from "./components/EnglishDB.vue";
import History from "./components/HistoryDB.vue";
import Geography from "./components/GeographyDB.vue";
import Biology from "./components/BiologyDB.vue"
import { reactive } from "vue";
let choice = reactive({title:'英文', value:"English"});
let items=[
  {title:'國文', value:"Chinese"},
  {title:'英文', value:"English"},
  {title:'歷史', value:"History"},
  {title:'地理', value:"Geography"},
  {title:'生物', value:"Biology"}
]
</script>

<template>
  <div style="width: 25rem">
    <v-select label="請選擇" v-model="choice.value" :items="items" item-title="title" item-value="value">
    </v-select>
    <Suspense>
      <Chinese v-if="choice.value === 'Chinese'" />
      <English v-else-if="choice.value === 'English'" />
      <History v-else-if="choice.value === 'History'" />
      <Geography v-else-if="choice.value === 'Geography'" />
      <Biology v-else />
    </Suspense>
  </div>
</template>
