import firebase from 'firebase'
import book from '../assets/img/svg/calendar.svg'

const subjects = () => {
    const d = document, c = console.log

    const subjectsScripts = setInterval(() => {
        if (d.readyState === 'complete') {
            clearInterval(subjectsScripts)

        }
    }, 100)

    return `
    <article class="subjects content-section u-hide">
        <h2 class="subjects-title"> Ciencias básicas </h2>

        <div class="subjects-content">
            <img src="${book}" class="archives-content__img">
            <a href="./another.html" class="subjects-content__name"> Matemáticas </a>
        </div>

        <div class="subjects-content">
            <img src="${book}" class="archives-content__img">
            <a href="#" class="subjects-content__name"> Cálculo Diferencial </a>
         </div>

        <div class="subjects-content">
            <img src="${book}" class="archives-content__img">
            <a href="#" class="subjects-content__name"> Cálculo Integral </a>
        </div>

        <div class="subjects-content">
            <img src="${book}" class="archives-content__img">
            <a href="#" class="subjects-content__name"> Cálculo de Varias variables </a>
        </div>

        <div class="subjects-content">
            <img src="${book}" class="archives-content__img">
            <a href="#" class="subjects-content__name"> Cálculo Multivariado </a>
        </div>

        <div class="subjects-content">
            <img src="${book}" class="archives-content__img">
            <a href="#" class="subjects-content__name"> Ecuaciones Diferenciales </a>
        </div>

    </article>
`}

export default subjects
