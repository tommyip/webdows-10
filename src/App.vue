<template>
  <div class="webdows">
    <div class="desktop" @app-launched="onAppLaunched">
      <button @click="launchApp('CalculatorApplication')">Calc</button>
      <component
        v-for="[id, instance] of appInstances"
        :key="id"
        :is="instance.value.app"
        :id="id"
        @app-visibility-change="onAppVisibilityChange"
        @app-exit="onAppExit"
      />
    </div>
    <TheTaskBar
      class="task-bar"
      :app-instances="appInstances"
      @app-visibility-toggle="onAppVisibilityToggle"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, computed, provide, InjectionKey, ComponentPublicInstance } from 'vue';
import TheTaskBar from './components/TheTaskBar.vue';
import Application from './components/Application.vue';
import CalculatorApplication, { CalculatorIcon } from './components/CalculatorApplication/index.vue';

export type InstanceID = number;
export type AppName = "CalculatorApplication";
export enum Visibility {
  Minimized,
  Windowed,
  Maximized,
};

export interface AppInstance {
  app: AppName;
  visibility: Visibility;
  iconComponent: string;
}
export type AppInstances = Map<InstanceID, Ref<AppInstance>>;
export const getInstance: InjectionKey<(id: InstanceID) => Ref<AppInstance>> = Symbol();

export default defineComponent({
  name: 'App',
  components: {
    TheTaskBar,
    CalculatorApplication,
    CalculatorIcon,
  },
  setup() {
    const appInstances = ref<AppInstances>(new Map());
    const getInstanceFn = (id: InstanceID): Ref<AppInstance> => {
      const instance = appInstances.value.get(id);
      if (instance) {
        return instance;
      }
      throw new Error(`Instance ${id} does not exist`);
    };
    provide(getInstance, getInstanceFn);

    let nextId = 0;
    const launchApp = (app: AppName) => {
      appInstances.value.set(nextId++, ref({
        app,
        visibility: Visibility.Windowed,
        iconComponent: app.replace('Application', 'Icon'),
      }));
    };

    const onAppVisibilityChange = (id: InstanceID, newVisibility: Visibility) => {
      const appInstance = appInstances.value.get(id);
      if (appInstance) {
        appInstance.value.visibility = newVisibility;
      }
    };

    const onAppVisibilityToggle = (id: InstanceID) => {
      const appInstance = appInstances.value.get(id);
      if (appInstance) {
        appInstance.value.visibility = appInstance.value.visibility == Visibility.Minimized ?
          Visibility.Windowed : Visibility.Minimized;
      }
    };

    const onAppExit = (id: InstanceID) => {
      appInstances.value.delete(id);
    };

    return {
      launchApp,
      onAppExit,
      onAppVisibilityChange,
      onAppVisibilityToggle,
      appInstances,
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
