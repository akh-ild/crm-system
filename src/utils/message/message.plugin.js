export default {
  install: (app, options) => {
    app.config.globalProperties.$message = (html) => {
      window.M.toast({ html })
    }
    app.config.globalProperties.$error = (html) => {
      window.M.toast({ html: `Error: ${html}` })
    }
  }
}
