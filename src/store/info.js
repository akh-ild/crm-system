// import firebase from 'firebase/compat/app'
import { getDatabase, ref, get } from 'firebase/database'

export default {
  state: {
    info: {}
  },
  getters: {
    info: state => state.info
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUserId')
        await get(ref(db, `/users/${uid}`)).then((info) => {
          const data = info.val()
          commit('setInfo', data)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
