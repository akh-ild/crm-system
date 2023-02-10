// import firebase from 'firebase/compat/app'
import { getDatabase, ref, push } from 'firebase/database'

export default {
  actions: {
    async createCategory ({ commit, dispatch }, details) {
      const { title, limit } = details
      const db = getDatabase()
      try {
        const uid = await dispatch('getUserId')
        const category = await push(ref(db, `users/${uid}/categories`), {
          title,
          limit
        })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
