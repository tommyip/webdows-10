<template>
  <div class="task-bar">
    <StartButton />
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import StartButton from './StartButton.vue';

export default defineComponent({
  name: 'TaskBar',
  components: {
    StartButton,
  },
});
</script>

<style scoped>
.task-bar {
  background-color: rgb(19, 19, 19);
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
