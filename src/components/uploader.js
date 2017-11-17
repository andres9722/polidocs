import firebase from "firebase"
import { progressBar, progressStatus, showProgress, hideProgress } from "./upload_progress"
import { errorMsg, successMsg } from "./helpers/messages"
import book from "../assets/img/png/formula.png"
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
        uploader = d.getElementById("form-uploader"),
        form = d.getElementById("form-upload"),
        output = d.querySelector(".uploader").querySelector(".progress-output")


      uploader.addEventListener("change", e => {
        Array.from(e.target.files).forEach(file => {
          c(e.target.files, file)
          output.innerHTML = ""

          if (file.type.match("image.*") || file.type.match("application/pdf") || file.type.match("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            output.innerHTML = successMsg("Tu archivo es válido")

            form.addEventListener("submit", event => {
              event.preventDefault()
              output.innerHTML = ""
              let uploadTask = storageRef.child(file.name).put(file)
              uploadTask.on("state_changed", data => {
                  showProgress();
                  progressStatus(data)
                },
                err => {
                  c(err, err.code, err.message)
                  output.innerHTML = errorMsg("Nombre de archivo no válido, elimina caracteres", err)
                },
                () => {
                  storageRef.child(file.name).getDownloadURL().then(url => {
                      output.insertAdjacentHTML("afterbegin",
                        `${successMsg("Tu archivo se ha subido")}
                              <div class="download-container">
                                  <img src="${book}" class="download-img">
                                  <p class="download-name"> Nombre del archivo: ${file.name} </p>
                                  <a href="${url}" class="download" download> <ins> Descargar </ins> </a>
                              </div>
                              `
                      )

                      let dates = new Date()

                      let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

                      let day = dates.getDate(),
                        monthIndex = dates.getMonth(),
                        year = dates.getFullYear()

                      let date = day + " " + monthNames[monthIndex] + " " + year

                      c("URL")
                      c(url)
                      c("USER")
                      c(user)
                      c("FILE")
                      c(file)

                      let teacher = d.getElementById("form-teacher").value,
                        type = d.getElementById("form-upload__type").value,
                        years = d.getElementById("form-upload__years").value,
                        subject = d.getElementById("form-upload__subject").value

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
        <h2 class="uploader-title"> Sube tus archivos ! </h2>
        <form name="form-upload" id="form-upload" class="form-upload">
            <input type="text" name="form-teacher" id="form-teacher" class="form-upload__teacher" placeholder="Nombre del profesor" required>

            <h3 class="form-upload__what"> ¿Qué vas a subir? </h3>
            <select class="form-upload__type" id="form-upload__type" required>
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

            <h3 class="form-upload__what"> ¿Materia? </h3>
            <select class="form-upload__subject" id="form-upload__subject" required>
              <option value="Matemáticas">Matemáticas</option>
              <option value="Cálculo Diferencial">Cálculo Diferencial</option>
              <option value="Cálculo Integral">Cálculo Integral</option>
              <option value="Cálculo Varias Variables">Cálculo Varias Variables</option>
              <option value="Ecuaciones Diferenciales">Ecuaciones Diferenciales</option>
            </select>

            <h3 class="form-upload__what"> ¿Año? </h3>
            <select class="form-upload__period" id="form-upload__years" required>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
            </select>


            <input type="file" id="form-uploader" multiple required>
            <label for="form-uploader" class="uploader-cloud">
                <i class="fa fa-cloud-upload" title="Sube tus archivos"></i>
            </label>

            <input type="submit" id="form-submit" class="form-submit" value="Subir archivo">
        </form>
        ${progressBar()}
    </article>
`
}

export default uploader
