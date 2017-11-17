import book from '../assets/img/png/diploma.png'

const header = () => (`
    <header class="header">
        <div class="header-logo">
            <img src=${book} class="header-logo__img">
            <p class="header-text"> Politécnico Colombiano Jaime Isaza Cadavid </p>
            <h1 class="header-title"> polidocs </h1>
        </div>
    </header>
`) 

export default header