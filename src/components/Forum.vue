<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore'
import app from '@/components/settings/FirebaseConfig.vue'


const login = inject('account', { name: '未登入', email: '', id: '', loginCount: 0 })

const state = reactive({
  storys: [{ id:'', title: '格式範本', content: 'xxx', author: '作者' }]
})
const update = ref(0)

const db = getFirestore(app)
generateContent()
async function generateContent() {
  // state.content = []
  const querySnapshot = await getDocs(collection(db, 'forum'))
  state.storys=[];
  querySnapshot.forEach((doc) => {
    state.storys.push({
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      author: doc.data().author
    })
    console.log(state.storys)
  })
}

// add
function addOpen() {
  addItem.title = ''
  addItem.content = ''
  addItem.author = login.name
}
const addItem = reactive({
  title: '',
  content: '',
  author: login.name
})
async function add() {
  const docRef = await addDoc(collection(db, 'forum'), {
    title: addItem.title,
    content: addItem.content,
    author: addItem.author
  })
  console.log('Document written with ID: ', docRef.id)
  generateContent()
}
async function del(id:string){
  await deleteDoc(doc(db, "forum", id));
  generateContent()
}
</script>
<template>
  <v-container style="background-color: #eee; display: flex; flex-direction: column;">

    <div style="background-color: #ddd; display: flex; flex-direction: column;">
      <!------------------- popper --------------------->
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            size="x-large"
            variant="outlined"
            color="secondary"
            @click="addOpen"
          >發表文章<v-icon icon="mdi-pencil-plus-outline" style="margin-left: 0.5rem;"></v-icon>
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="輸入...">
            <v-card-text>
              <v-sheet width="300" class="mx-auto">
                <v-form @submit.prevent>
                  <v-text-field v-model="addItem.title" label="標題"></v-text-field>
                  <v-text-field v-model="addItem.content" label="內文"></v-text-field>
                  <v-btn type="submit" @click="add" block class="mt-2">發布</v-btn>
                </v-form>
              </v-sheet>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="關閉" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>

    <div style="padding: 3rem">
      <div style="display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap">
        <div v-for="(story, index) in state.storys" :key="index">
          <v-card class="mx-auto px-2 py-3" min-width="20rem" min-height="8rem" hover>
            <v-card-item>
              <v-card-title> {{ story.title }} </v-card-title>
            </v-card-item>

            <v-card-text>
              {{ story.content }}
            </v-card-text>

            <v-card-actions style="display: flexbox; justify-content: space-between;">
              <v-card-subtitle> Author：{{ story.author }} </v-card-subtitle>
              <v-card-subtitle v-if="story.author === login.name">
                <v-btn @click="del(story.id)"><v-icon icon="mdi-trash-can-outline"></v-icon> 刪除</v-btn>
              </v-card-subtitle>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
    
  </v-container>
</template>
