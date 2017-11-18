import uploader from './components/uploader'
import header from './components/header'
import book from "./assets/img/svg/learning.svg";
import css from './style.scss'
import timelineSubject from './components/timelineSubject'
import { init } from './components/helpers/init'

init()


const subjectPage = `
  ${header()}
  <main class="Main">
    <a href="./index.html" class="uploader-form__submit">Ir a inicio</a>
    <h2 class="main-title">Cálculo Integral</h2>
    ${timelineSubject('Cálculo Integral')}
  </main>
`

document.getElementById('root').innerHTML = subjectPage
