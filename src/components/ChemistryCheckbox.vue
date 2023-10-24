<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({ message: "", currentQuestion: 0, answer: [] });

let exams = [
  { question: "哪些元素屬於鹼金屬?", answer: ["鈉", "鉀"], options: ["鈉", "鉀", "鈣", "鎂"] },
  { question: "哪些元素屬於鹼土金屬?", answer: ["鈣", "鎂"], options: ["鈉", "鉀", "鈣", "鎂"] },
  { question: "哪些元素屬於稀有氣體?", answer: ["氦", "氖", "氬"], options: ["氟", "氦", "氖", "氬"] }
];

function generateQuestion() {
  if (exams[state.currentQuestion].answer.length === state.answer.length) {
    let correct = 0;
    for (var item of state.answer) {
      if (exams[state.currentQuestion].answer.includes(item)) {
        correct++;
      }
    }
    if (correct == exams[state.currentQuestion].answer.length) {
      state.message = "答案正確";
      if (state.currentQuestion + 1 < exams.length) {
        state.currentQuestion++;
        state.answer = []; //清空上次的答案，否則會讀到上次的值
      }
    } else {
      state.message = "答案錯誤";
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
        <input type="checkbox" v-model="state.answer" :value="option" />
        {{ option }}
      </p>
    </span>
    {{ state.message }}
    <button class="btn" @click="generateQuestion">下一題</button>
  </div>
</template>
