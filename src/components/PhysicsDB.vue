<script setup lang="ts">
import { inject, reactive, watch } from 'vue'
import { collection, getDocs, getFirestore, where, query, addDoc } from 'firebase/firestore'
import app from '@/components/settings/FirebaseConfig.vue'

const login = inject('account', { name: '未登入', email: '', id: '' })
const account = reactive({
  name: login.name,
  id: login.id
})

watch(login, () => {
  if (login.email !== "") {
    account.name = login.name
    account.id = login.id
  }
})

let units = [
  { title: '單元一 位移和速度', value: 1 },
  { title: '單元二 牛頓運動定律', value: 2 }
]
const state = reactive({
  choice: 1,
  answer: [''],
  answers: [[]],
  message: [''],
  exams: [{ question: '', answer: '', answers: [''], option: [''], type: '' }],
  correctCount: 0,
  incorrectCount: 0,
})
//點選select時，會改變state.choice，利用watch，當state.choice改變時，重新讀取題目
const db = getFirestore(app)
const examCollection = collection(db, 'Physics')
generateQuestions()

watch(() => state.choice, generateQuestions)
async function generateQuestions() {
  state.exams = []
  const queryExam = query(examCollection, where('unit', '==', state.choice))
  const querySnapshot = await getDocs(queryExam)
  state.answers.push([]);
  querySnapshot.forEach((doc) => {
    state.exams.push({
      question: doc.data().question,
      answer: doc.data().answer,
      answers: doc.data().answers,
      option: doc.data().option,
      type: doc.data().type
    })
    //console.log(state.exams)
  })
}


async function checkAnswers() {
  state.message = [] // clear previous messages
  state.correctCount = 0
  state.incorrectCount = 0
  for (let i in state.exams) {
    if (state.exams[i].type === 'blank' || state.exams[i].type === 'radio') {
      if (state.answer[i] !== state.exams[i].answer) {
        state.message[i] = '答案錯誤'
        state.incorrectCount++
      } else {
        state.message[i] = '答案正確'
        state.correctCount++
      }
    }
    if (state.exams[i].type === 'checkbox') {
      if (state.exams[i].answers.length === state.answers[i].length) {
        let correct = 0
        for (var item of state.answers[i]) {
          if (state.exams[i].answers.includes(item)) {
            correct++
          }
        }
        if (correct == state.exams[i].answers.length) {
          state.message[i] = '答案正確'
          state.correctCount++
        } else {
          state.message[i] = '答案錯誤'
          state.incorrectCount++
        }
      } else {
        state.message[i] = '答案錯誤'
        state.incorrectCount++
      }
    }
  }
  await addDoc(collection(db, "user/" + account.id + "/record"),
    {
      subject: "Physics",
      unit: state.choice,
      correctCount: state.correctCount,
      incorrectCount: state.incorrectCount,
      date: new Date()
    }
  );
}
</script>
<template>
  <v-container>
    <div v-if="account.name !== ''">
      你好，{{ account.name }}
    </div>
    <v-select label="請選擇" v-model="state.choice" :items="units"> </v-select>

    <div v-for="(exam, index) in state.exams" :key="index">
      <p>問題 {{ index + 1 }}：</p>
      <v-text-field v-if="exam.type == 'blank'" v-model="state.answer[index]" :label="exam.question"
        :messages="state.message[index]"></v-text-field>

      <p v-if="exam.type === 'radio'">
        <v-radio-group :label="exam.question" :messages="state.message[index]" v-model="state.answer[index]">
          <span v-for="option in exam.option" :key="option">
            <v-radio :label="option" :value="option"></v-radio>
          </span>
        </v-radio-group>
      </p>

      <p v-if="exam.type === 'checkbox'">
        {{ exam.question }} {{ state.message[index] }}
        <span v-for="option in exam.option" :key="option">
          <v-checkbox inline v-model="state.answers[index]" :label="option" :value="option"></v-checkbox>
        </span>
      </p>
    </div>
    <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
    <v-alert style="margin-top: 0.5rem;" icon="$info">
      共答對{{ state.correctCount }}題 / 答錯{{ state.incorrectCount }}題
    </v-alert>
  </v-container>
</template>