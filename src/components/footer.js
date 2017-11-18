import { signOut } from './auth'
import firebase from 'firebase'

const footer = () => {
    const d = document, c = console.log

    const footerScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(footerScripts)

        }
    }, 100)

    return `
    <footer class="footer u-show">
        <h2> Footer </h2>
        ${signOut()}
    </footer>
`}

export default footer
