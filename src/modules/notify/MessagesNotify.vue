<template>
  <transition-group
    tag="div"
    id="notify-container"
    name="notify-transition"
  >
    <div
      :key="index"
      v-if="hasMessages"
      :class="message.type"
      @click="close(index)"
      class="notify flex-center"
      v-for="(message, index) in messages"
    >
      <div class="icon-info flex-center">
        <i class="material-icons">error</i>
      </div>
      <p class="text">{{ message.message }}</p>
      <div class="icon-close">
        <i class="material-icons">close</i>
      </div>
      <div class="close-bar"></div>
    </div>
  </transition-group>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  created () {
    this.$root.$on('Notify::show', payload => {
      this.SetMessage(payload)
    })
  },
  computed: {
    ...mapState('notify', ['messages']),
    ...mapGetters('notify', ['hasMessages'])
  },
  watch: {
    hasMessages () {
      setTimeout(() => {
        if (this.hasMessages) {
          document.querySelector('.close-bar')
            .style.animationDuration = `${this.messages[0].timeout / 1000}s`
        }
      }, 100)
    }
  },
  methods: {
    ...mapActions('notify', ['SetMessage', 'RemoveMessage']),
    close (index) {
      this.RemoveMessage(index)
    }
  }
}
</script>

<style lang="scss" scoped>
#notify-container {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000000;
  transition: .3s;
}
.notify {
  margin-bottom: 10px;
  width: 400px;
  min-height: 70px;
  padding: 5px 10px;
  color: #fff;
  cursor: pointer;
  opacity: .95;
  transition: all .3s;
  position: relative;
  &:hover {
    opacity: 1;
    filter: brightness(.9);
  }
  .icon-info {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid rgba(255, 255, 255, .4);
    height: 100%;
    font-size: 17pt;
  }
  .text {
    flex-grow: 10;
  }
  .icon-close {
    position: absolute;
    right: 5px;
    top: 0;
    transition: .3s;
    &:hover {
      opacity: .7;
    }
  }
  .close-bar {
    position: absolute;
    height: 3px;
    background: rgba(255, 255, 255, .5);
    bottom: 0;
    left: 0;
    animation-name: close-bar;
    animation-duration: 5s;
    animation-timing-function: linear;
  }
  &.success {
    background: #24be43;
  }
  &.danger {
    background: #f20400;
  }
  &.warning {
    background: #f2d505;
    color: #000;
  }
}

@keyframes close-bar {
  0% {width: 0}
  100% {width: 100%}
}

.notify-transition-enter, .notify-transition-leave-to {
  opacity: 0;
  transform: translateX(500px);
}
.notify-transition-enter-to, .notify-transition-leave {
  transform: translateX(-20px);
}
.notify-transition-leave-active {
  position: absolute;
}
</style>
