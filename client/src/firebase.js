import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyABnpU4cEvnqRZea2gqS7dgNvVS8zPmc7k",
    authDomain: "myspace-app-b9054.firebaseapp.com",
    projectId: "myspace-app-b9054",
    storageBucket: "myspace-app-b9054.firebasestorage.app",
    messagingSenderId: "220887697383",
    appId: "1:220887697383:web:3b401122a04931dabe1f42",
    databaseURL:"https://myspace-app-b9054-default-rtdb.firebaseio.com"
  };

export const app = initializeApp(firebaseConfig);