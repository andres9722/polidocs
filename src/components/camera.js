import firebase from 'firebase'

const camera = () => {
    const d = document, c = console.log

    const cameraScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(cameraScripts)

        }
    }, 100)

    return `
    <article class="camera">
        <h2> Camera </h2>
    </article>
`}

export default camera