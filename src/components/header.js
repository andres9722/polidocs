import book from '../assets/img/svg/graduation.svg'

const header = () => (`
    <header class="header">
        <div class="header-logo">
            <img src=${book} class="header-logo__img">
        </div>
        <div class="header-info">
          <p class="header-info__title"> Politécnico Colombiano Jaime Isaza Cadavid </p>
          <h1 class="header-info__text"> polidocs </h1>
        </div>
    </header>
`)

export default header
