import firebase from 'firebase'

export function saveArchiveInDB(url, user, file, obj) {
    firebase.database().ref().child('archives').push({
      archiveURL: url,
      fileName: file.name,
      fileType: file.type,
      dateUpload: obj.date,
      uid: user.uid,
      displayName: user.displayName,
      avatar: user.photoURL,
      teacher: obj.teacher,
      type: obj.type,
      year: obj.years,
      subject: obj.subject
    })
}


