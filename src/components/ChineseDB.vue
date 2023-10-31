<script setup lang="ts">
import { reactive, watch } from "vue";
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore";
import app from "@/components/settings/FirebaseConfig.vue";

let units=[
  {title:'單元一 成語勘錯', value:1},
  {title:'單元二 閱讀理解', value:2},
]
const state = reactive({choice:{title:'單元一 成語勘錯', value:1}, answer:[''], message: [''], exams: [{question:'', answer:''}] });


async function generateQuestions(){
  console.log(state.choice)
  state.exams=[];
  const queryExam = query(examCollection, where("unit", "==", state.choice));
  const querySnapshot = await getDocs(queryExam);
  querySnapshot.forEach((doc) => {
    state.exams.push({question:doc.data().question, answer:doc.data().answer});
  });
}

const db = getFirestore(app);
const examCollection = collection(db, "Chinese");
generateQuestions();
watch(() => state.choice,generateQuestions);

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
  state.message = []; // clear previous messages
  for (let i in state.exams) {
    if (state.answer[i] !== state.exams[i].answer) {
      state.message[i]="不正確";
    }
    else {
      state.message[i]="正確";}
  }

}

</script>
<template>
  <v-container>
    <v-select label="請選擇" v-model="state.choice" :items="units">
    </v-select>
    <div v-for="(exam, index) in state.exams" :key="index">
      <v-text-field v-model="state.answer[index]" 
      :label="exam.question" 
      :messages="state.message[index]"></v-text-field>
    </div>
    <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
  </v-container>
</template>