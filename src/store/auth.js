import firebase from 'firebase/compat/app'
import { getDatabase, ref, set } from 'firebase/database'
/* eslint-disable */
export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw `${e}`
      }
    },
    async logout () {
      await firebase.auth().signOut()
    },
    async register ({dispatch, commit}, details) {
      const { email, password, name } = details
      const db = getDatabase()
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        await set(ref(db, `users/${uid}`), {
          name,
          bill: 10000
        })
      } catch (e) {
        throw `${e}`
      }
    },

    // async register ({dispatch, commit }, details) {
    //
    //   try {
    //       await createUserWithEmailAndPassword(auth, email, password, login)
    //       const uid = await dispatch('getUid')
    //       await set(ref(db, 'users/' + uid), {
    //           username: login,
    //       });
    getUserId () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
