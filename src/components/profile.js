import firebase from "firebase"
import uploader from "./uploader"
import { signOut } from "./auth"
import { progressBar, progressStatus, showProgress, hideProgress } from "./upload_progress"
import { createCustomElement, printModal, removeModal } from "./modal"
import book from "../assets/img/svg/chemistry.svg"

const profile = () => {
  const d = document,
    c = console.log,
    user = firebase.auth().currentUser,
    databaseRef = firebase.database().ref().child("archives")

  let profileArchives = ''

  const profileScripts = setInterval(() => {
    if(d.readyState === 'complete') {
      clearInterval(profileScripts)
      databaseRef.on('value', data => {
        data.forEach(archive => {
          if(archive.val().uid === user.uid) {
            profileArchives += `
              <div class="archives-content">
                  <img src="${book}" class="archives-content__img">
                  <p class="profile-archives__name archives-content__name"> ${archive.val().fileName} </p>
                  <div class="archives-content__actions">
                    <a class="profile-archives__download" href="${archive.val().archiveURL}" download>  </a>
                    <button class="profile-archives__update" id="profile-archives__update" key-update="${archive.key}"></button>
                    <button class="profile-archives__delete" key-delete="${archive.key}"></button>
                  </div>
                  <p class="archives-content__date">Subido: ${archive.val().dateUpload} </p>
                  <p class="archives-content__date">Asignatura: ${archive.val().subject} </p>
                  <p class="archives-content__date">Profesor: ${archive.val().teacher} </p>
              </div>
                `
          }
        });

        d.querySelector(".profile-archives").innerHTML = profileArchives

        if (profileArchives !== "") {
          let archivesToDelete = d.getElementsByClassName("profile-archives__delete")
          for (let i = 0; i < archivesToDelete.length; i++) {
            archivesToDelete[i].addEventListener("click", e => {
              if (confirm("¿Está seguro de borrar el archivo?") === true) {
                let key = e.target.getAttribute("key-delete")
                c("key", key);
                let refArchiveToDelete = databaseRef.child(key)
                c("ref: ", refArchiveToDelete)

                refArchiveToDelete.remove()
              }
            });
          }

          let archivesToUpdate = d.getElementsByClassName("profile-archives__update")

          for (let i = 0; i < archivesToUpdate.length; i++) {
            archivesToUpdate[i].addEventListener("click", e => {

              let key = e.target.getAttribute("key-update");
              c("key", key);
              let refArchiveToUpdate = databaseRef.child(key)
              c("ref: ", refArchiveToUpdate);

              let openFormUpdate = () => {
                const formContainer = d.getElementById('uploader-update')
                formContainer.classList.add('show-form')
              }

              let closeFormUpdate = () => {
                const formContainer = d.getElementById('uploader-update')
                formContainer.classList.remove('show-form')
              }

              archivesToUpdate[i].addEventListener('click', openFormUpdate)

              /*let wrenchUpdateForm = d.getElementById('profile-archives__update')
              wrenchUpdateForm.addEventListener('click', openFormUpdate)*/

              let closeUpdateForm = d.getElementById('uploader-icon__close')
              closeUpdateForm.addEventListener('click', closeFormUpdate)

              refArchiveToUpdate.once("value", data => {
                let datos = data.val()
                c("dataaaaaaaa:", datos)
                d.getElementById("form-teacher__upload").value = datos.teacher
                d.getElementById("form-upload__type__upload").value = datos.type
                d.getElementById("form-upload__years__upload").value = datos.year
                d.getElementById("form-upload__subject__upload").value = datos.subject

                const storageRef = firebase.storage().ref().child("archives"),
                  //databaseRef = firebase.database().ref().child("archives"),
                  //user = firebase.auth().currentUser,
                  uploader = d.getElementById("form-uploader"),
                  form = d.getElementById("form-upload__update"),
                  output = d.querySelector(".uploader").querySelector(".progress-output")

                form.addEventListener("submit", event => {
                  event.preventDefault();
                  output.innerHTML = "";

                  let teacher = d.getElementById("form-teacher__upload").value,
                    type = d.getElementById("form-upload__type__upload").value,
                    years = d.getElementById("form-upload__years__upload").value,
                    subject = d.getElementById("form-upload__subject__upload").value;

                  refArchiveToUpdate.set({
                    archiveURL: datos.archiveURL,
                    fileName: datos.fileName,
                    fileType: datos.fileType,
                    dateUpload: datos.dateUpload,
                    uid: datos.uid,
                    displayName: datos.displayName,
                    avatar: datos.avatar,
                    teacher: teacher,
                    type: type,
                    year: years,
                    subject: subject
                  });
                });
              });
            });
          }
        }

        profileArchives = "";
      });
    }
  }, 100);

  return `
    <article class="profile content-section u-hide">
        <h2 class="profile-name"> ${user.displayName} </h2>
        <p class="profile-email"> ${user.email} </p>
        <img src="${user.photoURL}" class="profile-avatar">
        ${signOut()}
        <h3 class="profile-title"> Tus archivos </h3>
        <aside class="profile-archives"> </aside>
            <article class="uploader-update uploader" id="uploader-update">
            <h2 class="uploader-title"> Actualiza tus archivos ! </h2>
            <img src="https://image.flaticon.com/icons/svg/148/148766.svg" class="main-nav__icon" id="uploader-icon__close">

            <form name="form-upload" id="form-upload__update" class="form-upload">
                <input type="text" name="form-teacher" id="form-teacher__upload" class="form-upload__teacher" placeholder="Nombre del profesor" required>

                <h3 class="form-upload__what"> ¿Qué vas a subir? </h3>
                <select class="form-upload__type" id="form-upload__type__upload" required>
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
                <select class="form-upload__subject" id="form-upload__subject__upload" required>
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Cálculo Diferencial">Cálculo Diferencial</option>
                  <option value="Cálculo Integral">Cálculo Integral</option>
                  <option value="Cálculo Varias Variables">Cálculo Varias Variables</option>
                  <option value="Ecuaciones Diferenciales">Ecuaciones Diferenciales</option>
                </select>

                <h3 class="form-upload__what"> ¿Año? </h3>
                <select class="form-upload__period" id="form-upload__years__upload" required>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                </select>

                <input type="submit" id="form-submit" value="Actualizar">
            </form>
            ${progressBar()}
          </article>
          <div class="close" id="close">X</div>
        <div class="profile-update" id="profile-update"> </div>
    </article>
`;
};

export default profile;
