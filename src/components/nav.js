import { signOut } from './auth'
import firebase from 'firebase'

const nav = () => {
    const d = document, c = console.log

    const navScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(navScripts)
            const nav = d.querySelector('.main-nav'),
                sections = d.querySelectorAll('.content-section')
            
            nav.addEventListener('click', e => {
                e.preventDefault()
                if(e.target.parentElement.matches('button')) {
                    let btn = e.target.parentElement,
                        btnSection = btn.className.split('-')[0]

                    sections.forEach(section => {
                        if(section.classList.contains(btnSection)) {
                            section.classList.add('u-show', 'u-fadein')
                            section.classList.remove('u-hide')
                        } else {
                            section.classList.add('u-hide')
                            section.classList.remove('u-show', 'u-fadein')
                        }
                    })
                    
                    c(btn, btnSection)
                }
            })

        }
    }, 100)

    return `
    <nav class="main-nav ">
        <button class="timeline-button">
            <h2 class="main-nav__title"> Inicio </h2>
        </button>
        <button class="subjects-button">
            <h2 class="main-nav__title"> Asignaturas </h2>
        </button>
        <button class="profile-button">
            <h2 class="main-nav__title"> Perfil </h2>
        </button>
    </nav>
`}

export default nav