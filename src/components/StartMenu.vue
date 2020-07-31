<template>
  <div v-if="isOpen" class="menu-container">

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartMenu',
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

  border-top: 1px solid rgb(105, 105, 105);
  border-right: 1px solid rgb(105, 105, 105);
  background-color: rgb(44, 44, 44);
}
</style>
