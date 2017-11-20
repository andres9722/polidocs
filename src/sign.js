import css from "./style.scss";
import icon from "./assets/img/svg/graduates-2.svg";
import gmail from "./assets/img/svg/gmail.svg";

const signIn = () => `
  <div class="sign">
    <img src=${icon} class="sign-img">
    <h1 class="sign-title"> polidocs </h1>
    <button class="sign-button">
      <i class="fa fa-sign-in"></i>
      Entra con
      <img src=${gmail} class="sign-gmail">
    </button>
  </div>
`;

export default signIn;
