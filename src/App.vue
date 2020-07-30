<template>
  <div class="webdows">
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
.task-bar {
  width: 100%;
  height: 45px;
}
</style>
