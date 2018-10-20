<template>
  <div class="row" id="podcasts">
    <template v-if="loading">
      <div
        :key="i"
        v-for="i in 12"
        class="col-2 podcast-loading"
      >
        <div class="podcast-card">
          <div class="skeleton-loading podcast-image"></div>
          <div class="skeleton-loading podcast-title"></div>
          <div class="skeleton-loading podcast-description"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <router-link
        :key="index"
        class="col-2 podcast-link"
        :to="navigateLink(podcast)"
        v-for="(podcast, index) in list"
      >
        <div class="podcast-card">
          <div class="podcast-image">
            <img
              class="img-fluid"
              :src="podcast.image"
              :alt="`Logo ${podcast.name}`"
            >
          </div>
          <h3 class="podcast-title">
            {{ podcast.name }}
          </h3>
          <p
            class="podcast-description"
            v-abreviar-texto:40="podcast.description"
          />
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, required: true },
    loading: { type: Boolean, required: true }
  },
  methods: {
    navigateLink (podcast) {
      return {
        name: 'episodes-list',
        params: {
          id: podcast.id
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

#podcasts {
  .podcast-link {
    color: $light;
    .podcast-card {
      position: relative;
      border-radius: 2px;
      margin-bottom: 15px;
      .podcast-image {
        margin-bottom: 5px;
      }
      .podcast-title {
        color: $main;
        font-size: 12pt;
      }
      .podcast-description {
        font-size: 10pt;
      }
    }
  }

  .podcast-loading {
    .podcast-image {
      width: 100%;
      height: 170px;
      margin-bottom: 5px;
    }
    .podcast-title {
      width: 100%;
      height: 25px;
      margin-bottom: 5px;
    }
    .podcast-description {
      width: 100%;
      height: 15px;
    }
  }
}
</style>
