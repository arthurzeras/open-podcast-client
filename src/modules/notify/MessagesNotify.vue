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
  name: 'MessagesNotify',
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
@import '../../assets/scss/variables';

#notify-container {
  top: 10px;
  right: 10px;
  transition: .3s;
  position: fixed;
  z-index: 1000000;
}
.notify {
  width: 400px;
  opacity: .95;
  color: $white;
  cursor: pointer;
  min-height: 70px;
  position: relative;
  margin-bottom: 10px;
  transition: all .3s;
  padding: 5px 30px 5px 10px;
  &:hover {
    opacity: 1;
    filter: brightness(.9);
  }
  .icon-info {
    height: 100%;
    font-size: 17pt;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid $lighter;
  }
  .text {
    flex-grow: 10;
    font-size: 11pt;
  }
  .icon-close {
    top: 0;
    right: 5px;
    transition: .3s;
    position: absolute;
    &:hover {
      opacity: .7;
    }
    .material-icons {
      font-size: 15pt;
      margin-top: 3px;
    }
  }
  .close-bar {
    left: 0;
    bottom: 0;
    height: 3px;
    position: absolute;
    animation-duration: 5s;
    animation-name: close-bar;
    animation-timing-function: linear;
    background: $transparency;
  }
  &.success {
    background: $success;
  }
  &.warning {
    background: $warning;
    color: $dark;
  }
  &.danger {
    background: $danger;
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
