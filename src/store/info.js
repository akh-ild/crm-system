// import firebase from 'firebase/compat/app'
import { getDatabase, ref, get, update } from 'firebase/database'

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
        commit('setError', e)
        throw e
      }
    },
    async updateInfo ({ dispatch, commit, getters }, toUpdate) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUserId')
        const updateData = { ...getters.info, ...toUpdate }
        await update(ref(db, `/users/${uid}`), updateData).then(() => this.commit('setInfo', updateData))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
