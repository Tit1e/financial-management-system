import Vue from 'vue'

Vue.directive("autoheight", {
  inserted(el, binding) {
    el.style.height = `${document.body.clientHeight - 82 - (binding.value || 0)}px`
    el.style.overflow = 'auto'
    let timer = null
    window.addEventListener('resize',() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        el.style.height = `${document.body.clientHeight - 82 - (binding.value || 0)}px`
      },500)
    },false)
  }
})