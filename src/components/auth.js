import firebase from 'firebase'
import app from './app'
import sign from '../sign'
import { pwa, isOnLine } from './helpers/init'

const d = document, c = console.log

const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
        .then(result => c(`${result.user.email} ha iniciado sesión con Google`, result))
        .catch(err => c(`Error: ${err.code}: ${err.message}`))
}

const googleSignOut = () => {
    firebase.auth().signOut()
        .then( () => c('Te has desconectado correctamente de Google'))
        .catch( () => c('Ocurrio un error al desconectarse de Google'))
}

const signIn= () => {
    d.addEventListener('click', e => {
        if(e.target.matches('.sign-button')) {
            googleSignIn()
        }
    })

    return sign()
}

export const signOut = () => {
    d.addEventListener('click', e => {
        if(e.target.matches('.logout')) {
            googleSignOut()
        }
    })

    return `
        <button class="logout" title="Cerrar sesión">
            <i class="fa fa-sign-out"></i>
            Cerrar sesión
        </button>
    `
}

export const isAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
        const polidocs = d.querySelector('.polidocs')

        if(user) {
          polidocs.innerHTML = app()
          pwa()
        } else {
          polidocs.innerHTML = signIn()
        }

        isOnLine()
    })
}
