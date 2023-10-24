<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({ message: "", currentQuestion: 0, answer: [] });

let exams = [
  { question: "哪些單字沒有屬於的意思?", answer: ["be", "hey"], options: ["belong", "be", "appertain", "hey"] },
  { question: "哪些片語是照顧的意思?", answer: ["look after", "take care of"], options: ["look after", "take care of", "after all", "result in"] },
  { question: "與result in相似的片語?", answer: ["lead to", "cause","bring about","due to"], options: ["lead to", "cause","bring about","due to"] },
  { question: "哪些不是星期的英文?", answer: ["Everyday","Today","Yesterday"], options: ["Everyday","Monday","Today","Sunday","Yesterday"] },
  { question: "哪些不是月份的英文?", answer: ["Match", "Octopus"], options: ["March", "Match","Octopus","October"] }
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
