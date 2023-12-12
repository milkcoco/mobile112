<script setup lang="ts">
import { reactive, watch } from 'vue'
import { collection, getDocs, getFirestore, where, query } from 'firebase/firestore'
import app from '@/components/settings/FirebaseConfig.vue'

let units = [
  { title: '單元一 台灣歷史', value: 1 },
  { title: '單元二 中國歷史', value: 2 }
]
const state = reactive({
  choice: { title: '單元一 台灣歷史', value: 1 },
  answer: [''],
  message: [''],
  exams: [{ question: '', answer: '' }]
})

async function generateQuestions() {
  console.log(state.choice)
  state.exams = []
  const queryExam = query(examCollection, where('unit', '==', state.choice))
  const querySnapshot = await getDocs(queryExam)
  querySnapshot.forEach((doc) => {
    state.exams.push({ question: doc.data().question, answer: doc.data().answer })
  })
}

const db = getFirestore(app)
const examCollection = collection(db, 'History')
generateQuestions()
watch(() => state.choice, generateQuestions)

// const querySnapshot = await getDocs(queryExam);

// let exams:{question:string, answer:string}[]=[];
// querySnapshot.forEach((doc) => {
//   exams.push({question:doc.data().question, answer:doc.data().answer});
//   console.log('${doc.id} => ${doc.data()}');
// });

// let answer = "";
// const state = reactive({ message: "", currentQuestion: 0 });
// function generateQuestion() {
//   if (exams[state.currentQuestion].answer === answer) {
//     state.message = "答案正確";
//     if (state.currentQuestion + 1 < exams.length) {
//       state.currentQuestion++;
//     }
//   } else {
//     state.message = "答案錯誤";
//   }
// }
// generateQuestion();

function checkAnswers() {
  state.message = [] // clear previous messages
  for (let i in state.exams) {
    if (state.answer[i] !== state.exams[i].answer) {
      state.message[i] = '不正確'
    } else {
      state.message[i] = '正確'
    }
  }
}
</script>
<template>





<div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF2Frbx7tE&#x2F;view?embed" allow="fullscreen">
  </iframe>
</div>
蘇友祥 設計的 <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF2Frbx7tE&#x2F;view?utm_content=DAF2Frbx7tE&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">White Illustrative Creative Literature Project Presentation</a>
  <v-container>
    <v-select label="請選擇" v-model="state.choice" :items="units"> </v-select>
    <div v-for="(exam, index) in state.exams" :key="index">
      <v-text-field
        v-model="state.answer[index]"
        :label="exam.question"
        :messages="state.message[index]"
      ></v-text-field>
    </div>
    <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
  </v-container>
</template>


