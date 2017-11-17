import firebase from 'firebase'

export function saveArchiveInDB(url, user, file, date, teacher, type, years, subject) {
    firebase.database().ref().child('archives').push({
      archiveURL: url,
      fileName: file.name,
      fileType: file.type,
      dateUpload: date,
      uid: user.uid,
      displayName: user.displayName,
      avatar: user.photoURL,
      teacher: teacher,
      type: type,
      year: years,
      subject: subject
    })
}


