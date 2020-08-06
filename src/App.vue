<template>
  <div class="webdows">
    <div class="desktop">
      <CalculatorApplication />
    </div>
    <TheTaskBar class="task-bar" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, provide } from 'vue';
import TheTaskBar from './components/TheTaskBar.vue';
import CalculatorApplication from './components/CalculatorApplication/CalculatorApplication.vue';

export default defineComponent({
  name: 'App',
  components: {
    TheTaskBar,
    CalculatorApplication,
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
