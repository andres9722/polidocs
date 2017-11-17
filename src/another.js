import css from './style.scss'

const page = `
  <main class="Main">
    <h2 class="Main-title">Hola Mundo con Vanilla JS, Webpack, & Sass</h2>
    <i class="fa fa-smile-o"></i>
    <a href="./index.html">Ir a inicio</a>
  </main>
`

document.getElementById('root').innerHTML = page
