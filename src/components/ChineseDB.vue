<script setup lang="ts">
import { reactive, watch } from "vue";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"; 
import app from "@/components/settings/FirebaseConfig.vue"

const state = reactive({choice:1 , answer:[''],message: [''],exams:[{question:"", answer:""}] });

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const examCollection = collection(db, "Chinese");
generateQuestions();
let units=[
  {title:'單元一', value:1},
  {title:'單元二', value:2},
]
//點選select時，會改變state.choice，利用watch，當state.choice改變時，重新讀取題目
watch(() => state.choice,generateQuestions);
async function generateQuestions(){
  console.log(state.choice)
  state.exams=[];
  const queryExam = query(examCollection, where("unit", "==", state.choice));
  const querySnapshot = await getDocs(queryExam);
  querySnapshot.forEach((doc) => {
    state.exams.push({question:doc.data().question,answer:doc.data().answer});
  });
}

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
  <v-select label="請選擇" v-model="state.choice" :items="units" >
  </v-select>
  <v-card v-for="(exam, index) in state.exams" :key="index">
    <v-text-field v-model="state.answer[index]" 
    :label="exam.question" 
    :messages="state.message[index]"></v-text-field>
  </v-card>
  <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
</v-container>
</template>