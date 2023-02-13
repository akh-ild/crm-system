import { getDatabase, ref, push, get } from 'firebase/database'

export default {
  state: {
    records: null
  },
  getters: {
    records: state => state.records
  },
  mutations: {
    setRecords (state, records) {
      state.records = records
    }
  },
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      const db = getDatabase()
      try {
        const uid = await dispatch('getUserId')
        return await push(ref(db, `users/${uid}/records`), record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({ dispatch, commit }) {
      const db = getDatabase()
      try {
        const uid = await dispatch('getUserId')
        await get(ref(db, `/users/${uid}/records`)).then((info) => {
          let data = info.val() || {}
          data = Object.keys(data).map(key => ({ ...data[key], id: key }))
          commit('setRecords', data)
          commit('setIsLoading', false)
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
