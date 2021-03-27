<template>
  <component :is="tag" @click="handleClick">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: String
  },
  methods: {
    handleClick(ev) {
      const link = ev.currentTarget?.querySelector("[data-main-link]");
      link?.click();
    }
  }
}
</script>