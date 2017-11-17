import firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCf-0XLkuMFkMwS-zp2XetkVQaA7IaVhUo",
    authDomain: "polidocs-a5943.firebaseapp.com",
    databaseURL: "https://polidocs-a5943.firebaseio.com",
    projectId: "polidocs-a5943",
    storageBucket: "polidocs-a5943.appspot.com",
    messagingSenderId: "768570648499"
}

export const init = () => firebase.initializeApp(config)

