<template>
  <div id="player">
    <div class="player-bar"></div>
    <div class="player-bar-indicator"></div>
    <div class="player-bar-point"></div>
    <div class="row text-center no-gutters player-container">
      <div class="col podcast-info">
        <div class="row no-gutters">
          <div class="col flex-center">
            <img
              class="img-fluid"
              alt="Logo do podcast"
              src="https://i.scdn.co/image/6a8a5cffd99871a235277fca58bbabfc8e272a0d"
            >
          </div>
          <div class="podcast-info-labels col-10">
            <div class="podcast-episode-title">Viajar é se f*der 2</div>
            <div class="podcast-title">Nerdcast</div>
          </div>
        </div>
      </div>
      <div class="col-6 player-main flex-center-column">
        <div class="player-time flex-center">
          00:00:00 / 01:15:23
        </div>
        <div class="player-controls flex-center">
          <div class="material-icons">replay_10</div>
          <div class="material-icons">play_arrow</div>
          <div class="material-icons">forward_10</div>
        </div>
      </div>
      <div class="col player-details flex-center">
        <div class="row no-gutters w-100">
          <div class="col-8">
            <div class="player-volume row no-gutters">
              <div class="col flex-center">
                <span class="material-icons">volume_up</span>
                <!-- <span class="material-icons">volume_off</span> -->
              </div>
              <div class="col-10 flex-center">
                <span class="volume-bar"></span>
                <span class="volume-bar-indicator"></span>
                <span class="volume-bar-point"></span>
              </div>
            </div>
          </div>
          <div class="col flex-center">
            <div class="material-icons">favorite</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

@mixin bar($color) {
  width: 100%;
  height: 4px;
  display: block;
  cursor: pointer;
  position: relative;
  background-color: $color;
}

@mixin bar-indicator() {
  top: 0;
  left: 0;
  height: 4px;
  position: absolute;
  background-color: $main;
}

@mixin bar-point() {
  left: 0;
  width: 10px;
  z-index: 100;
  height: 10px;
  display: block;
  transition: .4s;
  cursor: pointer;
  position: absolute;
  border-radius: 100%;
  background-color: $main;
  border: 1px solid $white;
}

#player {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  position: absolute;
  background-color: $dark;

  .player-bar {
    @include bar($main-dark);
  }
  .player-bar-indicator {
    @include bar-indicator();
  }
  .player-bar-point {
    @include bar-point();
    top: -3px;
  }

  .material-icons {
    transition: .4s;
    cursor: pointer;
    &:hover {
      color: $main;
    }
  }

  .player-container {
    .col, [class*="col-"] {
      height: 70px;
    }
    .podcast-info {
      padding-left: 15px;
      img {
        width: 100%;
      }
      .podcast-info-labels {
        display: flex;
        text-align: left;
        padding-left: 10px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .podcast-title {
          font-size: 10pt;
        }
      }
    }
    .player-main {
      .player-time {
        font-weight: bold;
        margin-top: 5px;
      }
      .player-controls {
        height: 70px;
        .material-icons {
          font-size: 25pt;
          padding: 0 10px;
        }
      }
    }
    .player-details {
      .player-volume {
        .material-icons {
          cursor: pointer;
          &:hover {
            color: $main;
          }
        }
        .volume-bar {
          @include bar($darker)
        }
        .volume-bar-indicator {
          @include bar-indicator();
        }
        .volume-bar-point {
          @include bar-point();
        }
      }
    }
  }
}
</style>
