<script setup lang="ts">
import { reactive } from "vue";
let answer = "";
const state = reactive({ message: "", currentQuestion: 0 });

let exams = [
    { question: "氫的化學符號", answer: "H" },
    { question: "氧的化學符號", answer: "O" },
    { question: "氦的化學符號", answer: "HE" },
]

function generateQuestion() {
  if (exams[state.currentQuestion].answer === answer) {
    state.message = "答案正確";
    if (state.currentQuestion+1 < exams.length) {
        state.currentQuestion++;
    }
  } else {
    state.message = "答案錯誤";
  }
}

</script>
<template>
  <div>
    <p>問題 {{ state.currentQuestion+1 }}, {{ state.currentQuestion+1 }}/{{ exams.length }}</p>
    {{ exams[state.currentQuestion].question }}
    <input type="text" v-model="answer" />
    {{ state.message }}
    <button @click="generateQuestion">下一題</button>
  </div>
</template>
