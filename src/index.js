import css from './style.scss'
import { init } from './components/helpers/init'
import { isAuth } from './components/auth'

init()

const app = `
  <main class="polidocs">
    <h2 class="Main-title">Sistema de autenticacion</h2>
    <i class="fa fa-smile-o"></i>
    <a href="./another.html">Ir a otra aplicación con React</a>
    ${isAuth()}
  </main>
`

document.getElementById('root').innerHTML = app
