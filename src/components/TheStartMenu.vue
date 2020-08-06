<template>
  <div v-if="isOpen" class="menu-container">

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheStartMenu',
  props: {
    isOpen: Boolean,
  },
});
</script>

<style scoped>
.menu-container {
  width: 500px;
  height: 500px;
  position: absolute;
  left: 0;
  bottom: var(--task-bar-height);
  background-color: var(--light-bg);
}
</style>
