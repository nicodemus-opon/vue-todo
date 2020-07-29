import Vue from 'vue'
import Vuex from 'vuex'

import db from '../src/firebase'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import router from '../src/router'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export const store = new Vuex.Store(
  {
    plugins: [createPersistedState({
      storage: window.sessionStorage,
  })],
    state: {
      todos: [],
      user: [],
    },
    mutations: {
      addTodo(state, todo) {
        state.todos.push({
          id: todo.id,
          title: todo.title,
          completed: false,
          priority: todo.priority,
          description: todo.description,
          due_date: todo.due_date,
          date_created: todo.date_created,
          uid: state.user[0].uid,
        })
      },
      retrieveTodos(state, todos) {
        //console.log("hyui")
        state.todos = todos;
        //console.log(state.todos);
      },
      deleteTodo(state, id) {
        const index = state.todos.findIndex(item => item.id == id)

        if (index >= 0) {
          state.todos.splice(index, 1)
        }
      },
      updateTodo(state, todo) {
        const index = state.todos.findIndex(item => item.id == todo.id)
        state.todos.splice(index, 1, {
          'id': todo.id,
          'title': todo.title,
          'completed': todo.completed,
          'date_created': todo.date_created,
          'due_date': todo.due_date,
          'priority': todo.priority,
          'uid': todo.uid,
        })
      },
      login(state, vrs) {
        state.user = [];
        state.user.push({
          username: vrs.uname,
          profile: vrs.uimgurl,
          uid: vrs.uid,
          loggedin: vrs.loggedin,
        })
      },
    },
    getters: {
      getTodos: state => {
        return state.todos.filter(todo => todo.uid==state.user[0].uid);
      },
      getUser: state => {
        return state.user[0];
        
      }
    },
    actions: {
      addTodos(context, todo) {
        console.log("kiki");
        let tss = new Date();
        let uidx = todo.uid
        db.collection('todos').add({
          title: todo.title,
          description: "",
          completed: false,
          date_created: tss,
          due_date: "",
          uid: uidx,
          priority: "priority-2",
        })
          .then(docRef => {
            context.commit('addTodo', {
              id: docRef.id,
              title: todo.title,
              completed: false,
              priority: "priority-2",
              description: "",
              due_date: "",
              date_created: tss,
              uid: uidx,
            })
          })
      },
      retrieveTodos(context) {

        db.collection('todos').get()
          .then(querysnapshot => {
            let tempTodos = [];
            querysnapshot.forEach(doc => {

              const data = {
                id: doc.id,
                uid: doc.data().uid,
                title: doc.data().title,
                priority: doc.data().priority,
                completed: doc.data().completed,
                description: doc.data().description,
                due_date: doc.data().due_date,
                date_created: doc.data().date_created,
              }
              tempTodos.push(data);
              //console.log(doc.data());
            })
            const tempTodosSorted = tempTodos.sort((a, b) => {
              return a.date_created.seconds - b.date_created.seconds
            })

            context.commit('retrieveTodos', tempTodosSorted)
          })

      },
      deleteTodo(context, id) {
        db.collection('todos').doc(id).delete()
          .then(() => {
            context.commit('deleteTodo', id)
          })
      },
      updateTodo(context, todo) {
        console.log("lo")
        console.log(todo)

        console.log(todo.priority)
        db.collection('todos').doc(todo.id).set({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          date_created: todo.date_created,
          due_date: todo.due_date,
          uid: todo.uid,
          priority: todo.priority,

        }, { merge: true })
          .then(() => {
            context.commit('updateTodo', todo)
          })
      },
      toggleCompleted(context, id) {
        console.log(todo[id]);
        db.collection('todos').doc(id).set({

          completed: todo[id].completed,
          // timestamp: todo.timestamp,
        }, { merge: true })
          .then(() => {
            //context.commit('updateTodo', todo)
          })
      },
      login(context) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(function (result) {
            console.log(result);
            console.log(result.user.displayName.split(' ')[0]);
            var uimgurl = result.user.photoURL
            var uid = result.user.uid
            var uname = result.user.displayName.split(' ')[0]
            var loggedin = true;
            context.commit('login', {
              uimgurl: uimgurl,
              uid: uid,
              uname: uname,
              loggedin: loggedin,
            })
            router.push('/') 
          })
          .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
          })
      },
      logout(context){
        sessionStorage.clear();
        router.push('/login') 
      }
    },

  }
)