<script setup lang="ts">
import { reactive, watch } from "vue";
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore";
import app from "@/components/settings/FirebaseConfig.vue";

let units=[
  {title:'單元一 植物', value:1},
  {title:'單元二 動物', value:2},
]
const state = reactive({choice:{title:'單元一 植物', value:1}, answer:[''], message: [''], exams: [{question:'', answer:'', answers:[''], option:[''], type:''}] });


async function generateQuestions(){
  console.log(state.choice)
  state.exams=[];
  const queryExam = query(examCollection, where("unit", "==", state.choice));
  const querySnapshot = await getDocs(queryExam);
  querySnapshot.forEach((doc) => {
    state.exams.push({question:doc.data().question, 
                      answer:doc.data().answer, 
                      answers:doc.data().answers, 
                      option:doc.data().option,
                      type:doc.data().type,
                    });
    console.log(state.exams)
  });
}

const db = getFirestore(app);
const examCollection = collection(db, "Biology");
generateQuestions();
watch(() => state.choice,generateQuestions);

function checkAnswers() {
  state.message = []; // clear previous messages
  for (let i in state.exams) {
    if (state.exams[i].type === 'blank' || state.exams[i].type === 'radio'){
      if (state.answer[i] !== state.exams[i].answer) {
        state.message[i]="不正確";
      }
      else {
        state.message[i]="正確";
      }
    }
    if (state.exams[i].type === 'checkbox'){
      if (state.answer[i] !== state.exams[i].answer) {
        state.message[i]="不正確";
      }
      else {
        state.message[i]="正確";
      }
    }

  }

}

</script>
<template>
  <v-container>
    <v-select label="請選擇" v-model="state.choice" :items="units">
    </v-select>

    <div v-for="(exam, index) in state.exams" :key="index">

      <v-text-field v-if="exam.type=='blank'" v-model="state.answer[index]" 
      :label="exam.question" 
      :messages="state.message[index]"></v-text-field>

      <p v-if="exam.type==='radio'"> {{ exam.question }}
        <span v-for="option in exam.option" :key="option">
          <input type="radio" v-model="state.answer[index]" :label="option" :value="option">{{ option }}
        </span>
        {{ state.message[index] }}
      </p>

      <p v-if="exam.type==='checkbox'"> {{ exam.question }}
        {{ state.answer[index] }}
        {{ exam.option }}
        <span v-for="option in exam.option" :key="option">
          <input type="checkbox" v-model="state.answer[index]" :value="option" />{{ option }}
        </span>
        {{ state.message[index] }}
      </p>
      
      <!-- vuetify -->
      <!-- <v-radio-group inline :label="exam.question" v-model="state.answer">
        <span v-for="option in exam.option" :key="option">
          <v-radio :label="option" :value="option"></v-radio>
        </span>
      </v-radio-group> -->

    </div>
    
    <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
  </v-container>
</template>