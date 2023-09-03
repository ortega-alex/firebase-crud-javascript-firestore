// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { addDoc, getFirestore, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeT0EpttVhIsOMTqi8___XII854J0rRfw",
    authDomain: "fir-javascript-crud-fbebe.firebaseapp.com",
    projectId: "fir-javascript-crud-fbebe",
    storageBucket: "fir-javascript-crud-fbebe.appspot.com",
    messagingSenderId: "147450072868",
    appId: "1:147450072868:web:04558231bfed705599edb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const dbName = "tasks"

export const saveTask = task =>
    addDoc(collection(db, dbName), task)

export const getTasks = () => getDocs(collection(db, dbName))

export const onGetTasks = callback => onSnapshot(collection(db, dbName), callback)

export const deleteTask = id => deleteDoc(doc(db, dbName, id))

export const getTask = id => getDoc(doc(db, dbName, id))

export const updateTask = (id, task) => updateDoc(doc(db, dbName, id), task)
