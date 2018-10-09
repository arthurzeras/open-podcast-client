<template>
  <button
    :type="type"
    :disabled="loading"
    class="btn btn-lg btn-main flex-center"
  >
    <template v-if="loading">
      {{ labelLoading }}
      <i class="material-icons animate-loading">sync</i>
    </template>
    <template v-else>
      <slot></slot>
      <template v-if="!hasSlot">
        {{ label }}
      </template>
    </template>
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    label: { type: String },
    labelLoading: { type: String },
    type: { type: String, default: 'submit' },
    loading: { type: Boolean, required: true }
  },
  computed: {
    hasSlot () {
      return !!this.$slots.default
    }
  }
}
</script>
