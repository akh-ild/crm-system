// import firebase from 'firebase/compat/app'
import { getDatabase, ref, push, get, child, update } from 'firebase/database'

export default {
  state: {
    categories: null
  },
  getters: {
    categories: state => state.categories
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    }
  },
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
    },
    async updateCategory ({ commit, dispatch }, details) {
      const { id, title, limit } = details
      const db = getDatabase()
      try {
        const uid = await dispatch('getUserId')
        await update(child(ref(db, `/users/${uid}/categories`), id), {
          title,
          limit
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories ({ commit, dispatch }) {
      commit('setIsLoading', true)
      const db = getDatabase()
      try {
        const uid = await dispatch('getUserId')
        await get(ref(db, `/users/${uid}/categories`)).then((info) => {
          const data = info.val() || {}
          const categories = Object.keys(data).map(key => ({ ...data[key], id: key }))
          commit('setCategories', categories)
          commit('setIsLoading', false)
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
