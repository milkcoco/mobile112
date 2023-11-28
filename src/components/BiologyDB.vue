<script setup lang="ts">
import { inject, reactive, watch } from 'vue'
import { collection, getDocs, getFirestore, where, query, updateDoc, doc, arrayUnion } from 'firebase/firestore'
import app from '@/components/settings/FirebaseConfig.vue'

const login = inject('account', { name: '未登入', email: '', id: '', unit: '', questionNumber: 0 })
const account = reactive({
  name: login.name,
  unit: login.unit,
  questionNumber: login.questionNumber
})
watch(login, () => {
  if (login.email!== ""){
    account.name = login.name
    // account.unit = appAccount.unit
    // account.questionNumber = appAccount.questionNumber
  }
})

let units = [
  { title: '單元一 科學方法與生命現象', value: 1 },
  { title: '單元二 細胞的構造', value: 2 },
  { title: '單元三 物質進出細胞的方式', value: 3 },
  { title: '單元四 生物體的組成層次', value: 4 }
]
const state = reactive({
  choice: { title: '單元一 科學方法與生命現象', value: 1 },
  ing:'',
  answer: [''],
  answers: [[]],
  message: [''],
  exams: [{ question: '', answer: '', answers: [''], option: [''], type: '' }]
})

async function generateQuestions() {
  console.log(state.choice.title)
  state.ing = state.choice.title
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

const db = getFirestore(app)
const examCollection = collection(db, 'Biology')
generateQuestions()
watch(() => state.choice, generateQuestions)

async function checkAnswers() {
  await updateDoc(doc(db, "user", login.id), {
    subjects: arrayUnion("生物")
});
  
  state.message = [] // clear previous messages
  for (let i in state.exams) {
    account.questionNumber++;
    if (state.exams[i].type === 'blank' || state.exams[i].type === 'radio') {
      if (state.answer[i] !== state.exams[i].answer) {
        state.message[i] = '答案錯誤'
      } else {
        state.message[i] = '答案正確'
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
        } else {
          state.message[i] = '答案錯誤'
        }
      } else {
        state.message[i] = '答案錯誤'
      }
    }
  }
}
</script>
<template>
  <v-container>
    <div v-if="account.name!==''">
    你好，{{ account.name }} 你已答 {{ account.questionNumber }} 題
    </div>
    <v-select label="請選擇" v-model="state.choice" :items="units"> </v-select>
    
    <div v-for="(exam, index) in state.exams" :key="index">
      <p>問題 {{ index+1 }}：</p>
      <v-text-field
        v-if="exam.type == 'blank'"
        v-model="state.answer[index]"
        :label="exam.question"
        :messages="state.message[index]"
      ></v-text-field>

      <p v-if="exam.type === 'radio'">
        <!-- {{ exam.question }}
        <span v-for="option in exam.option" :key="option">
          <input type="radio" v-model="state.answer[index]" :label="option" :value="option" />
          {{ option }}
        </span>
        {{ state.message[index] }} -->
        <v-radio-group
          :label="exam.question"
          :messages="state.message[index]"
          v-model="state.answer[index]"
        >
          <span v-for="option in exam.option" :key="option">
            <v-radio :label="option" :value="option"></v-radio>
          </span>
        </v-radio-group>
      </p>

      <p v-if="exam.type === 'checkbox'">
      <p>{{ exam.question }} {{ state.message[index] }}</p>
      <span v-for="option in exam.option" :key="option">
        <v-checkbox inline v-model="state.answers[index]" :label="option" :value="option" ></v-checkbox>
      </span>
        
      </p>
    </div>

    <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
  </v-container>
</template>