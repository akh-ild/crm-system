export default {
  mounted (el, { value }) {
    console.log(1, el, value)
    window.M.Tooltip.init(el, { html: value })
  },
  unmounted (el) {
    const tooltip = window.M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) tooltip.destroy()
  }
}
