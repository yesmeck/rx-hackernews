import firebase from 'firebase'

const db = firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
}).database()

function fetch(path) {
  return new Promise(resolve => {
    db.ref(`/v0/${path}`).once('value', snapshot => {
      resolve(snapshot.val())
    })
  })
}

function watch(path, cb) {
  const ref = db.ref(`/v0/${path}`)
  const handler = snapshot => {
    cb(snapshot.val())
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}

export function watchIdsByType(type, cb) {
  return watch(`${type}stories`, cb)
}

export function fetchIdsByType(type) {
  return fetch(`${type}stories`)
}

export function fetchItem(id) {
  return fetch(`item/${id}`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
  return fetch(`user/${id}`)
}
