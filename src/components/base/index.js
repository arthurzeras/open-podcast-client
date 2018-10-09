import Vue from 'vue'

const requireComponent = require.context('.', false, /Base[\w-]+\.vue$/)

requireComponent.keys().forEach(file => {
  const configComponent = requireComponent(file)
  const componentName = file.replace(/^\.\//, '').replace(/\.\w+$/, '')

  Vue.component(componentName, configComponent.default || configComponent)
})
