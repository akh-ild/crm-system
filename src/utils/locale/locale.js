import locale from './locale.json'
import store from '@/store'

export default {
  install: (app, options) => {
    app.config.globalProperties.$locale = (key) => {
      const lang = store.getters.info.lang
      return locale[key][lang] || 'no-translation'
    }
  }
}
