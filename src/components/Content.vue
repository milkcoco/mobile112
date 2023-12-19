<script setup lang="ts">
import router from '@/router'
import { reactive } from 'vue'

let subject = [
  { title: '物理', value: 1, to: 'physics', src: '' },
  { title: '化學', value: 2, to: 'chemical', src: '' },
  { title: '生物', value: 3, to: 'biology', src: '' },
  {
    title: '地科',
    value: 4,
    to: 'geology',
    src: 'https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF3WVgJb1g&#x2F;view?embed'
  }
]

const state = reactive({
  choice: 1
})

function goTest(choice: number) {
  router.push('/' + subject[choice - 1].to)
}
</script>

<template>
  <v-container>
    <v-select label="請選擇" v-model="state.choice" :items="subject"> </v-select>

    <div style="display: flex; justify-content: center; margin-bottom: 2rem">
      <div
        style="
          position: relative;
          width: 80%;
          height: 0;
          padding-top: 56.25%;
          padding-bottom: 0;
          box-shadow: 0 2px 8px 0 rgba(63, 69, 81, 0.16);
          margin-top: 1.6em;
          margin-bottom: 0.9em;
          overflow: hidden;
          border-radius: 8px;
          will-change: transform;
        "
      >
      <!-- 物理 -->
        <iframe
          v-if="state.choice === 1"
          loading="lazy"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            padding: 0;
            margin: 0;
          "
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF3Wdr7rcQ&#x2F;view?embed"
        >
        </iframe>
      <!-- 化學 -->
        <iframe
          v-if="state.choice === 2"
          loading="lazy"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            padding: 0;
            margin: 0;
          "
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF3Wea-ckc&#x2F;view?embed"
        >
        </iframe>
      
      <!-- 生物 -->
        <iframe
          v-if="state.choice === 3"
          loading="lazy"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            padding: 0;
            margin: 0;
          "
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF3WfDicwI&#x2F;view?embed"
        >
        </iframe>

      <!-- 地科 -->
        <iframe
          v-if="state.choice === 4"
          loading="lazy"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            padding: 0;
            margin: 0;
          "
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF3WVgJb1g&#x2F;view?embed"
        >
        </iframe>
      </div>
    </div>
    <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
      elevation="4"
      height="250"
      rounded
      max-width="800"
      width="100%"
    >
      <div>
        <h2 class="text-h4 font-weight-black text-orange">Congratulations!</h2>

        <div class="text-h5 font-weight-medium mb-2">你已經閱讀完本頁的全部內容囉！</div>

        <p class="text-body-2 mb-4">
          <v-icon icon="mdi-arrow-down-bold"></v-icon>點及下方按鈕前往牛刀小試<v-icon
            icon="mdi-arrow-down-bold"
          ></v-icon>
        </p>

        <v-btn variant="text" color="orange" @click="goTest(state.choice)">Go to Test</v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>
