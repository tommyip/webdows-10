<template>
  <div class="webdows">
    <div class="desktop" @app-launched="onAppLaunched">
      <component
        v-for="[id, instance] of appInstances"
        :key="id"
        :is="instance.value.appComponent"
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
import { InstanceID, uniqueId } from './utils';
import TheTaskBar from './components/TheTaskBar.vue';
import Application from './components/Application.vue';
import CalculatorApplication, { CalculatorIcon } from './components/CalculatorApplication/index.vue';
import NotepadApplication, { NotepadIcon } from './components/NotepadApplication/index.vue';

type AppComponentName = "CalculatorApplication" | "NotepadApplication";
export interface App {
  appComponent: AppComponentName;
  iconComponent: string;
}

export enum Visibility {
  Minimized,
  Windowed,
  Maximized,
};

export interface AppInstance extends App {
  visibility: Visibility;
}

export type AppInstances = Map<InstanceID, Ref<AppInstance>>;

export const getInstanceSym: InjectionKey<(id: InstanceID) => Ref<AppInstance>> = Symbol();
export const launchAppSym: InjectionKey<(appName: AppComponentName) => void> = Symbol();

export const apps = new Map<string, App>([
  ['notepad', { appComponent: 'NotepadApplication', iconComponent: 'NotepadIcon' }],
  ['calculator', { appComponent: 'CalculatorApplication', iconComponent: 'CalculatorIcon' }],
]);

export default defineComponent({
  name: 'App',
  components: {
    TheTaskBar,
    CalculatorApplication,
    CalculatorIcon,
    NotepadApplication,
    NotepadIcon,
  },
  setup() {
    const appInstances = ref<AppInstances>(new Map());
    provide(getInstanceSym, (id: InstanceID): Ref<AppInstance> => {
      const instance = appInstances.value.get(id);
      if (instance) {
        return instance;
      }
      throw new Error(`Instance ${id} does not exist`);
    });

    provide(launchAppSym, (appName: string) => {
      const app = apps.get(appName);
      if (app) {
        appInstances.value.set(uniqueId(), ref({
          ...app,
          visibility: Visibility.Windowed,
        }));
      } else {
        throw Error(`Trying to launch undefined application ${appName}`);
      }
    });

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
