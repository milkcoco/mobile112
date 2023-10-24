<script setup lang="ts">
import Add from "./components/Add.vue";
import Chemistry from "./components/Chemistry.vue";
import ChemistryRadio from "./components/ChemistryRadio.vue";
import ChemistryCheckbox from "./components/ChemistryCheckbox.vue";
import EnglishRadio from "./components/EnglishRadio.vue";
import EnglishCheckbox from "./components/EnglishCheckbox.vue";
import English  from "./components/EnglishDB.vue";
import { reactive } from "vue";
let choice = reactive({title:'英文', value:"English"});
let items=[
  {title:'英文', value:"English"},
  {title:'化學', value:"Chemistry"},
  {title:'化學單選', value:"ChemistryRadio"}
]
</script>

<template>
  <div style="width: 25rem">
    <v-select label="請選擇" v-model="choice.value" :items="items" item-title="title" item-value="value">
    </v-select>
    <Suspense>
      <English v-if="choice.value === 'English'" />
      <Chemistry v-else-if="choice.value === 'Chemistry'" />
      <ChemistryRadio v-else />
    </Suspense>

    <!-- <select v-model="choice" class="sel">
      <option value="Add">加法</option>
      <option value="Chemistry">化學填空</option>
      <option value="ChemistryRadio">化學單選</option>
      <option value="ChemistryCheckbox">化學多選</option>
      <option value="EnglishRadio">英文單選</option>
      <option value="EnglishCheckbox">英文多選</option>
      <option value="English">英文</option>
    </select> -->
    
    <!-- <Chemistry v-if="choice === 'Chemistry'" />
    <ChemistryRadio v-else-if="choice === 'ChemistryRadio'" />
    <ChemistryCheckbox v-else-if="choice === 'ChemistryCheckbox'" />
    <EnglishRadio v-else-if="choice === 'EnglishRadio'" />
    <EnglishCheckbox v-else-if="choice === 'EnglishCheckbox'" />
    <Add v-else /> -->
  </div>
</template>
