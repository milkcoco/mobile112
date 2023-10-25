<script setup lang="ts">
import { reactive } from "vue";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/components/settings/FirebaseConfig.vue";
const db = getFirestore(app);
const querySnapshot = await getDocs(collection(db, "Biology"));
let exams:{question:string, answer:string}[]=[];
querySnapshot.forEach((doc) => {
  exams.push({question:doc.data().question, answer:doc.data().answer});
  console.log('${doc.id} => ${doc.data()}');
});
let answer = "";
const state = reactive({ message: "", currentQuestion: 0 });

function generateQuestion() {
  if (exams[state.currentQuestion].answer === answer) {
    state.message = "答案正確";
    if (state.currentQuestion + 1 < exams.length) {
      state.currentQuestion++;
    }
  } else {
    state.message = "答案錯誤";
  }

}
generateQuestion();
</script>
<template>
  <div>
    <v-text-field v-model="answer"
      :label="exams[state.currentQuestion].question"
      :messages="state.message">
    </v-text-field>
    <v-btn color="primary" @click="generateQuestion">下一題</v-btn>
  </div>
</template>