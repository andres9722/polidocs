import css from './style.scss'
import book from './assets/img/png/bookmark.png'

const signIn = () => (`
  <div class="sign">
    <img src=${book} class="sign-img">
    <h1 class="sign-title"> polidocs </h1>
    <button class="sign-button">
      <i class="fa fa-sign-in"></i>
      Entra con
      <i class="fa fa-google"></i>
    </button>
  </div>
`)

export default signIn