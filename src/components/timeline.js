import firebase from 'firebase'
import uploader from './uploader'
import book from "../assets/img/png/diploma.png";

const timeline = () => {
    const d = document, c = console.log


    const timelineScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(timelineScripts)
            const databaseRef = firebase.database().ref().child('archives')
            const timelineArchives = d.querySelector('.timeline-archives')
            function ArchiveTemplate(obj) {
              return `
                <div class="subjects-content">
                  <img src="${book}" class="subjects-content__img">
                  <p class="profile-archives__name subjects-content__name"> ${obj.fileName} </p>
                  <a class="fa fa-download profile-archives__download subjects-content__name" href="${obj.archiveURL}" download>  </a>
                  <p class="profile-archives__date subjects-content__date"> Fecha de subida: ${obj.dateUpload} </p>
                  <p class="profile-archives__date subjects-content__date"> Autor de subida: ${obj.displayName} </p>
                  <p class="profile-archives__date subjects-content__date"> Asignatura: ${obj.subject} </p>
                  <p class="profile-archives__date subjects-content__date"> Profesor: ${obj.teacher} </p>
                  <p class="profile-archives__date subjects-content__date"> Tipo: ${obj.type} </p>
                </div>
              `
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
    }, 100)

    return `
    <article class="timeline content-section u-show">
        ${uploader()}
        <aside class="timeline-archives">

      </aside>
    </article>
`}

export default timeline
