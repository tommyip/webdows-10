<template>
  <div class="webdows">
    <div class="desktop"></div>
    <TaskBar class="task-bar" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import TaskBar from './components/TaskBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    TaskBar,
  },
});
</script>

<style scoped>
.webdows {
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}

.desktop {
  flex: 1;
}

.task-bar {
  height: var(--task-bar-height);
}
</style>
