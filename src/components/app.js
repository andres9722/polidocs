import header from './header'
import uploader from './uploader'
import camera from './camera'
import footer from './footer'
import nav from './nav'
import timeline from './timeline'
import subjects from './subjects'
import profile from './profile'
import timelineSubject from './timelineSubject'

const app = () => (`
    ${header()}
    ${nav()}
    <section class="content">
        ${timeline()}
        ${subjects()}
        ${profile()}
    </section>
`)

export default app
