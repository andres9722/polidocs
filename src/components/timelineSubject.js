import firebase from 'firebase'
import book from "../assets/img/svg/chemistry.svg"

const timelineSubject = name => {
    const d = document, c = console.log,
      databaseRef = firebase.database().ref().child("archives")

    let timelineArchives = ''
    const timelineSubjectScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(timelineSubjectScripts)
            databaseRef.on('value', data => {
              data.forEach(archive => {
                if(archive.val().subject === name) {
                  timelineArchives += `
                  <div class="archives-content">
                      <img src="${book}" class="archives-content__img">
                      <p class="profile-archives__name archives-content__name"> ${archive.val().fileName} </p>
                      <div class="archives-content__actions">
                        <a class="profile-archives__download" href="${archive.val().archiveURL}" download>  </a>
                      </div>
                      <p class="archives-content__date">Subido: ${archive.val().dateUpload} </p>
                      <p class="archives-content__date">Asignatura: ${archive.val().subject} </p>
                      <p class="archives-content__date">Profesor: ${archive.val().teacher} </p>
                  </div>
                    `
                }
              })

              d.querySelector(".timeline-subject").innerHTML = timelineArchives
            })
        }
    }, 100)

    return `
    <article class="timeline-subject content">
    </article>
`}

export default timelineSubject
