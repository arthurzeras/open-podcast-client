<template>
  <div id="app">
    <router-view/>
    <layout-player/>
  </div>
</template>

<script>
import LayoutPlayer from './components/layout/LayoutPlayer'

export default {
  components: {
    LayoutPlayer
  }
}
</script>
