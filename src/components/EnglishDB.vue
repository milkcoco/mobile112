<script setup lang="ts">
import { reactive, watch } from 'vue'
import { collection, getDocs, getFirestore, where, query } from 'firebase/firestore'
import app from '@/components/settings/FirebaseConfig.vue'

let units = [
  { title: '單元一 水果', value: 1 },
  { title: '單元二 動物', value: 2 }
]
const state = reactive({
  choice: { title: '單元一 水果', value: 1 },
  answer: [],
  answers: [[]],
  message: [''],
  exams: [{ question: '', option: [], answer: '', type: '' }]
})

async function generateQuestions() {
  console.log(state.choice)
  state.exams = []
  const queryExam = query(examCollection, where('unit', '==', state.choice))
  const querySnapshot = await getDocs(queryExam)
  querySnapshot.forEach((doc) => {
    state.answers.push([])
    state.exams.push({
      question: doc.data().question,
      option: doc.data().option,
      answer: doc.data().answer,
      type: doc.data().type
    })
  })
}

const db = getFirestore(app)
const examCollection = collection(db, 'English')
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
//    if (state.currentQuestion + 1 < exams.length) {
//       state.currentQuestion++;
//     }
//   } else {
//     state.message = "答案錯誤";
//   }
// }
//generateQuestion();

function checkAnswers() {
  state.message = [] // clear previous messages
  for (let i in state.exams) {
    if (state.exams[i].type == 'random') {
      if (state.answer[i] !== state.exams[i].answer) {
        state.message[i] = '不正確'
      } else {
        state.message[i] = '正確'
      }
    } else {
      // console.log("multiple")
      // console.log(state.exams[i].answer.length)
      // console.log(state.answers[i].length)

      if (state.exams[i].answer.length === state.answers[i].length) {
        let correct = 0
        for (var item of state.answers[i]) {
          if (state.exams[i].answer.includes(item)) {
            correct++
          }
        }
        // console.log(correct)
        if (correct == state.exams[i].answer.length) {
          state.message[i] = '答案正確'
        } else {
          state.message[i] = '答案錯誤'
        }
      } else {
        state.message[i] = '答案錯誤'
        console.log("error")
      }
    }
    
  }
  await updateDoc(doc(db,"user",appAccount.id),{subjects:arrayUnion("英文")})
  await updateDoc(doc(db,"user",appAccount.id),{unit:arrayUnion("英文"+state.choice)})
  await addDoc(collection(db,"user/"+appAccount.id+"/record"),
  {subject:"英文",
  unit:state.choice,
    correctCount: state.correct,
   incorrectCount: state.incorrectCount,
  date: new Date()})
}



</script>
<template>
  <v-container>
    <v-select label="請選擇" v-model="state.choice" :items="units"> </v-select>
    <div v-for="(exam, index) in state.exams" :key="index">
      {{ state.exams[index].question }}
      <div v-if="state.exams[index].type == 'random'">
        <v-text-field
          v-model="state.answer[index]"
          :label="exam.question"
          :messages="state.message[index]"
        ></v-text-field>
      </div>
      <div v-else>
        <span v-for="option in exam.option" :key="option">
          <input type="checkbox" v-model="state.answers[index]" :value="option" />
          {{ option }}
        </span>
        {{ state.message[index] }}
      </div>
    </div>

    <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
  </v-container>
</template>
