import { signOut } from "./auth"
import firebase from "firebase"

const nav = () => {
  const d = document,
    c = console.log

  const navScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(navScripts)
      const nav = d.querySelector('.main-nav'),
        sections = d.querySelectorAll(".content-section")

      nav.addEventListener('click', e => {
        e.preventDefault()
        if(e.target.parentElement.matches("button")) {
          let btn = e.target.parentElement,
            btnSection = btn.className.split("-")[0]

          sections.forEach(section => {
            if(section.classList.contains(btnSection)) {
              section.classList.add('u-show', 'u-fadein')
              section.classList.remove('u-hide')
            } else {
              section.classList.add('u-hide')
              section.classList.remove('u-show', 'u-fadein')
            }
          })
        }
      })
    }
  }, 100)

  return `
    <nav class="main-nav ">
        <button class="timeline-button">
            <p class="main-nav__name"> Inicio </p>
        </button>
        <button class="subjects-button">
            <p class="main-nav__name"> Asignaturas </p>
        </button>
        <button class="profile-button">
            <p class="main-nav__name"> Perfil </p>
        </button>
    </nav>
`
}

export default nav;
