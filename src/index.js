import { init, ga } from "./components/helpers/init";
import { isAuth } from "./components/auth";

init();

const app = `
  <main class="polidocs">
    ${isAuth()}
  </main>
`;

document.getElementById("root").innerHTML = app;

ga();
