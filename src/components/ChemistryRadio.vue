<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({ message: "", currentQuestion: 0, answer: "" });

let exams = [
    { question: "氫的化學符號是:", answer: "H", options: ["He", "T", "Ti", "H"] },
    { question: "氧的化學符號是:", answer: "O", options: ["Y", "O", "Yi", "I"] },
    { question: "氦的化學符號是:", answer: "HE", options: ["Hi", "He", "H", "Ha"] },
];

function generateQuestion() {
  if (exams[state.currentQuestion].answer === state.answer) {
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
    <span v-for="option in exams[state.currentQuestion].options">
      <p>
        <input type="radio" v-model="state.answer" :value="option" />
        {{ option }}
      </p>
    </span>
    {{ state.message }}
    <button class="btn" @click="generateQuestion">下一題</button>
  </div>
</template>
