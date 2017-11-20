import firebase from 'firebase'
import uploader from './uploader'
import book from "../assets/img/svg/learning.svg";

const timeline = () => {
    const d = document, c = console.log

    const timelineScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(timelineScripts)
            const databaseRef = firebase.database().ref().child('archives')
            const timelineArchives = d.querySelector('.timeline-archives')
            function ArchiveTemplate(obj) {
              return `
                <div class="archives-content">
                  <img src="${book}" class="archives-content__img">
                  <p class="archives-content__name"> ${obj.fileName} </p>
                  <div class="archives-content__actions">
                    <a class="profile-archives__download" href="${obj.archiveURL}" download>  </a>
                  </div>
                  <p class="archives-content__date"> Fecha de subida: ${obj.dateUpload} </p>
                  <p class="archives-content__date"> Autor de subida: ${obj.displayName} </p>
                  <p class="archives-content__date"> Asignatura: ${obj.subject} </p>
                  <p class="archives-content__date"> Profesor: ${obj.teacher} </p>
                  <p class="archives-content__date"> Tipo: ${obj.type} </p>
                  <a href="${obj.archiveURL}" class="sharing archives-content__date"> SHARE </a>
                </div>
              `
            }

            if(navigator.share) {
              d.querySelectorAll('a.sharing').forEach(el => {
                el.addEventListener('click', e => {
                  e.preventDefault()
                  const url = this.href
                  navigator.share({
                    title: 'polidocs',
                    text: 'Descarga tu archivo',
                    url: url
                  })
                  return false
                })
              })
            }

            databaseRef.once('value', data => {
              data.forEach(archive => {
                timelineArchives.insertAdjacentHTML('afterbegin', ArchiveTemplate(archive.val()))
              })
            })

            databaseRef.on('child_added', data => {
              timelineArchives.insertAdjacentHTML('afterbegin', ArchiveTemplate(data.val()))
            })
        }
    }, 50)

    return `
    <article class="timeline content-section u-show">
      ${uploader()}
      <h2 class="main-title">Últimos subidos</h2>
      <aside class="timeline-archives"> </aside>
    </article>
`}

export default timeline
