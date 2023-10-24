<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({ message: "", currentQuestion: 0, answer: "" });

let exams = [
    { question: "螞蟻的英文是:", answer: "Ant", options: ["Ant", "Animals", "Age", "Apple"] },
    { question: "香蕉的英文是:", answer: "Banana", options: ["Bob", "Baddie", "Back", "Banana"] },
    { question: "手機的英文是:", answer: "Phone", options: ["People", "Phone", "Paper", "Puppy"] },
    { question: "飲料的英文是:", answer: "Drink", options: ["Drink", "Dad", "Dead", "Dump"] },
    { question: "戒指的英文是:", answer: "Ring", options: ["Rock", "Rabbit", "Ring", "Rare"] }
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
