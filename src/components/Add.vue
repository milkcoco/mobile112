<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
  firstNum: random(),
  secondNum: random(),
  message: "",
});
let answer = 0;
function generateQuestion() {
  if (state.firstNum + state.secondNum === Number(answer)) {
    state.message = "答案正確";
    state.firstNum = random();
    state.secondNum = random();
    answer = 0;
  } else {
    state.message = "答案錯誤";
  }
}
function random() {
  return Math.floor(Math.random() * 10);
}
</script>
<template>
  <div>
    {{ state.firstNum }} + {{ state.secondNum }} =
    <input type="text" v-model="answer" />
    {{ state.message }}
    <button @click="generateQuestion">點一下</button>
  </div>
</template>