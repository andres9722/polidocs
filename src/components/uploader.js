import firebase from "firebase"
import { progressBar, progressStatus, showProgress, hideProgress } from "./upload_progress"
import { errorMsg, successMsg } from "./helpers/messages"
import book from "../assets/img/png/formula.png"
import upload from "../assets/img/svg/upload.svg"
import { saveArchiveInDB } from "./helpers/archives_db"

const uploader = () => {
  const d = document,
    c = console.log

  const uploaderScripts = setInterval(() => {
    if (d.readyState === "complete") {
      clearInterval(uploaderScripts)
      const storageRef = firebase.storage().ref().child("archives"),
        databaseRef = firebase.database().ref().child("archives"),
        user = firebase.auth().currentUser,
        uploader = d.getElementById("uploader-former"),
        form = d.getElementById("uploader-form"),
        output = d.querySelector(".uploader").querySelector(".progress-output")

      uploader.addEventListener("change", e => {
        Array.from(e.target.files).forEach(file => {
          output.innerHTML = ""

          if(file.type.match("image.*") || file.type.match("application/pdf") || file.type.match("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            form.addEventListener("submit", event => {
              event.preventDefault()
              output.innerHTML = ''
              let uploadTask = storageRef.child(file.name).put(file)
              uploadTask.on("state_changed", data => {
                  showProgress();
                  progressStatus(data)
                },
                err => {
                  output.innerHTML = errorMsg("Nombre de archivo no válido, elimina caracteres", err)
                },
                () => {
                  storageRef.child(file.name).getDownloadURL().then(url => {
                      output.insertAdjacentHTML("afterbegin",
                        `${successMsg("Tu archivo se ha subido")}
                          <div class="download-container">
                              <img src="${book}" class="download-container__img">
                              <p class="download-container__name"> Nombre del archivo: ${file.name} </p>
                              <a href="${url}" class="download-container__link" download> <ins> Descargar </ins> </a>
                          </div>
                        `
                      )

                      let dates = new Date(),
                        monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                        day = dates.getDate(),
                        monthIndex = dates.getMonth(),
                        year = dates.getFullYear(),
                        date = day + " " + monthNames[monthIndex] + " " + year

                      let teacher = d.getElementById("form-teacher").value,
                        type = d.getElementById("uploader-form__type").value,
                        years = d.getElementById("uploader-form__year").value,
                        subject = d.getElementById("uploader-form__subject").value

                      saveArchiveInDB(url, user, file, date, teacher, type, years, subject)
                    })
                    .catch(err => (output.innerHTML = errorMsg("Error", err)))
                })
            })
          } else {
            output.innerHTML = errorMsg("Archivo no válido", null)
          }
        })
      })
    }
  }, 100)

  return `
    <article class="uploader">
      <h2 class="uploader-title"> Sube tus archivos</h2>

      <form name="uploader-form" id="uploader-form" class="uploader-form">
          <label for="form-teacher" class="uploader-form__input"> ¿Profesor? </label>
          <input type="text" name="form-teacher" id="form-teacher" class="input" placeholder="Nombre del profesor" required>

          <label form="uploader-form__type" class="uploader-form__input"> ¿Qué vas a subir? </label>
          <select class="select" id="uploader-form__type" name="uploader-form__type" required>
            <option value="Quiz #1">Quiz #1</option>
            <option value="Quiz #2">Quiz #2</option>
            <option value="Quiz #3">Quiz #3</option>
            <option value="Quiz #4">Quiz #4</option>
            <option value="Quiz #5">Quiz #5</option>
            <option value="Parcial">Parcial</option>
            <option value="Final">Final</option>
            <option value="Taller">Taller</option>
            <option value="Otro">Otro</option>
          </select>

          <label for="uploader-form__subject"> ¿Asignatura? </label>
          <select class="select" id="uploader-form__subject" name="uploader-form__subject" required>
            <option value="Matemáticas">Matemáticas</option>
            <option value="Cálculo Diferencial">Cálculo Diferencial</option>
            <option value="Cálculo Integral">Cálculo Integral</option>
            <option value="Cálculo Varias Variables">Cálculo Varias Variables</option>
            <option value="Ecuaciones Diferenciales">Ecuaciones Diferenciales</option>
          </select>

          <label for="uploader-form__year"> ¿Año? </label>
          <select class="select" id="uploader-form__year" name="uploader-form__year" required>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
          </select>


          <input type="file" id="uploader-former" multiple required>
          <label for="uploader-former" class="uploader-cloud">
              <img src="${upload}" class="uploader-former__img" title="Sube tus archivos">
              <p class="uploader-former__text">Selecciona tu archivo</p>
          </label>

          <input type="submit" id="uploader-form__submit" class="uploader-form__submit" value="Subir archivo">
        </form>
        ${progressBar()}
    </article>
`
}

export default uploader
