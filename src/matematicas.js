import uploader from './components/uploader'
import header from './components/header'
import book from "./assets/img/svg/learning.svg";
import css from './style.scss'
import timelineSubject from './components/timelineSubject'
import { init, pwa } from './components/helpers/init'

init()
pwa()

const subjectPage = `
  ${header()}
  <main class="Main">
    <a href="./index.html" class="uploader-form__submit">Ir a inicio</a>
    <h2 class="main-title">Matemáticas</h2>
    ${timelineSubject('Matemáticas')}
  </main>
`

document.getElementById('root').innerHTML = subjectPage
