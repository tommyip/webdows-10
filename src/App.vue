<template>
  <div class="webdows">
    <div class="desktop">
      <Calculator />
    </div>
    <TaskBar class="task-bar" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, provide } from 'vue';
import TaskBar from './components/TaskBar.vue';
import Calculator from './components/Calculator/Calculator.vue';

export default defineComponent({
  name: 'App',
  components: {
    TaskBar,
    Calculator,
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
  position: relative;
  display: block;
}

.task-bar {
  height: var(--task-bar-height);
}
</style>
