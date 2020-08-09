<template>
  <div class="webdows">
    <div class="desktop" @app-launched="onAppLaunched">
      <button @click="launchApp('CalculatorApplication')">Calc</button>
      <div v-for="[id, name] of apps" :key="id">
        <component
          :is="name"
          :id="id"
          @app-exit="onAppExit"
        />
      </div>
    </div>
    <TheTaskBar class="task-bar" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, ComponentPublicInstance } from 'vue';
import TheTaskBar from './components/TheTaskBar.vue';
import Application from './components/Application.vue';
import CalculatorApplication from './components/CalculatorApplication/CalculatorApplication.vue';

type InstanceID = number;
type AppName = "CalculatorApplication";

export default defineComponent({
  name: 'App',
  components: {
    TheTaskBar,
    CalculatorApplication,
  },
  setup() {
    const apps = ref<Map<InstanceID, AppName>>(new Map());

    let nextId = 0;
    const launchApp = (appName: AppName) => {
      apps.value.set(nextId++, appName);
    };

    const onAppExit = (id: number) => {
      apps.value.delete(id);
    };

    return {
      launchApp,
      onAppExit,
      apps,
      CalculatorApplication,
    };
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
