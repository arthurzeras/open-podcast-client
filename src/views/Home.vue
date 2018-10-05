<template>
  <div class="home">
    <audio :src="source" ref="audioEl"></audio>

    <code>
      Volume: {{ volumePorcentagem }}
    </code>
    <br>
    <div style="margin-bottom: 10px">
      <span v-formatar-tempo="tempo"></span> /
      <span v-formatar-tempo="tempoTotal"></span>
    </div>
    <button @click="alternar()">Pausar/Iniciar</button>
    <div style="margin-top: 10px">
      Volume:
      <button @click="controlarVolume('+')">+</button>
      <button @click="controlarVolume('-')">-</button>
    </div>
    <br>
    <!-- <input
      min="0"
      step="1"
      type="range"
      v-model="tempo"
      :max="tempoTotal"
      @change="alterarTempo($event)"
    > -->

    <div class="progress">
      <div
        class="progress-bar"
        @click="alterarTempo($event)"
      ></div>
      <div
        ref="progressBar"
        @click="alterarTempo($event)"
        class="progress-bar-indicator"
      ></div>
      <span class="point-indicator" ref="progressPoint"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      source: 'https://nerdcast.jovemnerd.com.br/nerdcast_636_viajar_e_se_fuder_2.mp3',
      tempo: 0,
      volume: 0,
      tempoTotal: 0,
      interval: null
    }
  },
  mounted () {
    this.volume = this.$refs.audioEl.volume
  },
  computed: {
    volumePorcentagem () {
      return `${this.volume * 100}%`
    }
  },
  methods: {
    alternar () {
      const { audioEl, progressBar, progressPoint } = this.$refs
      if (audioEl.paused) {
        audioEl.play()
        this.tempoTotal = audioEl.duration
        this.interval = setInterval(() => {
          const currentTime = parseInt(audioEl.currentTime)
          this.tempo = currentTime === this.tempo
            ? this.tempo
            : currentTime

          // porcentagem do tempo
          const percent = (this.tempo * 100) / this.tempoTotal
          progressBar.style.width = `${percent}%`
          progressPoint.style.left = `${percent}%`
        }, 100)
      } else {
        audioEl.pause()
        clearInterval(this.interval)
      }
    },
    controlarVolume (param) {
      const el = this.$refs.audioEl
      if (param === '+' && this.volume < 1) {
        this.volume = (this.volume * 10 + 0.1 * 10) / 10
      }

      if (param === '-' && this.volume > 0) {
        this.volume = (this.volume * 10 - 0.1 * 10) / 10
      }

      el.volume = this.volume
    },
    alterarTempo (ev) {
      // this.$refs.audioEl.currentTime = parseInt(ev.target.value)
      const { progressBar, progressPoint, audioEl } = this.$refs
      const clickedPoint = ev.offsetX
      let fullWidth = ev.target.offsetWidth

      if (ev.target === progressBar) {
        fullWidth = ev.target.parentElement.firstChild.offsetWidth
      }

      const percent = (clickedPoint * 100) / fullWidth
      progressBar.style.width = `${percent}%`
      progressPoint.style.left = `${percent}%`

      audioEl.currentTime = (percent * audioEl.duration) / 100
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  .progress {
    width: 80%;
    margin-top: 15px;
    position: relative;
    > * {
      cursor: pointer;
    }
    .progress-bar {
      width: 100%;
      height: 3px;
      display: block;
      background-color: #333;
      position: relative;
    }
    .progress-bar-indicator {
      content: ' ';
      position: absolute;
      background-color: red;
      height: 3px;
      left: 0;
      top: 0;
    }
    .point-indicator {
      transition: .4s;
      content: ' ';
      display: block;
      position: absolute;
      height: 10px;
      width: 10px;
      top: -5px;
      left: 0;
      z-index: 100;
      border-radius: 100%;
      border: 1px solid #ee9999;
      background-color: #fff;
    }
  }
}
</style>
