<template>
  <transition
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster"
  >
    <div class="flex-center-column" id="screen-loader" v-if="visible">
      <i class="material-icons animated bounce infinite">mic</i>
      Um momento por favor
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  created () {
    this.$root.$on('Spinner::show', this.toggleSpinner)
    this.$root.$on('Spinner::hide', this.toggleSpinner)
  },
  methods: {
    toggleSpinner () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

#screen-loader {
  top: 0;
  left: 0;
  width: 100%;
  color: $main;
  height: 100vh;
  position: fixed;
  z-index: 10000000000;
  background-color: $darker;
  & > * {
    font-size: 40pt !important;
  }
}
</style>
