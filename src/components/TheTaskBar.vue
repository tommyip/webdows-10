<template>
  <div class="task-bar">
    <TheStartButton />
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import TheStartButton from './TheStartButton.vue';

export default defineComponent({
  name: 'TheTaskBar',
  components: {
    TheStartButton,
  },
});
</script>

<style scoped>
.task-bar {
  background-color: var(--light-bg);
  color: var(--text-dark-bg);

  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

.task-bar > * {
  height: 100%;
  padding: 0;
}
</style>
