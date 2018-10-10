import Vue from 'vue'
import { truncate } from 'lodash'

Vue.directive('formatar-tempo', (el, { value }) => {
  if (value) {
    let segundos = parseInt(value, 10)
    let horas = Math.floor(segundos / 3600)
    let minutos = Math.floor((segundos - (horas * 3600)) / 60)
    segundos = segundos - (horas * 3600) - (minutos * 60)

    if (horas < 10) {
      horas = `0${horas}`
    }

    if (minutos < 10) {
      minutos = `0${minutos}`
    }

    if (segundos < 10) {
      segundos = `0${segundos}`
    }

    el.innerHTML = `${horas}:${minutos}:${segundos}`
  } else {
    el.innerHTML = '00:00:00'
  }
})

Vue.directive('abreviar-texto', (el, { value, arg }) => {
  el.innerHTML = truncate(value, {
    length: arg || 25
  })
})
