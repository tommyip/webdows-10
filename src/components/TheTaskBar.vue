<template>
  <div class="task-bar">
    <TheStartButton />
    <button
      v-for="app in pinnedApps"
      :key="app"
      @click="onPinnedAppBtnClick(app)"
      class="app-btn"
    >
      <component :is="apps.get(app)?.iconComponent" class="icon" />
    </button>
    <button
      v-for="[id, instance] of appInstances"
      :key="id"
      @click="onAppInstanceBtnClick(id)"
      class="app-btn app-instance-btn"
    >
      <component :is="instance.value.iconComponent" class="icon" />
    </button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, inject } from 'vue';
import { InstanceID } from '../utils';
import { apps, App, AppInstances, launchAppSym } from '../App.vue';
import TheStartButton from './TheStartButton.vue';

import CalculatorIcon from './CalculatorApplication/Icon.vue';
import NotepadIcon from './NotepadApplication/Icon.vue';

const pinnedApps = ['notepad', 'calculator'];

export default defineComponent({
  name: 'TheTaskBar',
  components: {
    TheStartButton,
    CalculatorIcon,
    NotepadIcon,
  },
  props: {
    appInstances: {
      type: Map as PropType<AppInstances>,
      required: true,
    },
  },
  emits: {
    'app-visibility-toggle': (id: InstanceID) => true,
  },
  setup(props, { emit }) {
    const onPinnedAppBtnClick = inject(launchAppSym)!;

    const appInstances = props.appInstances;
    const onAppInstanceBtnClick = (id: InstanceID) => {
      emit('app-visibility-toggle', id);
    };

    return {
      apps,
      pinnedApps,
      onPinnedAppBtnClick,
      appInstances,
      onAppInstanceBtnClick,
    };
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
  width: 50px;
  height: 100%;
  padding: 0;
}

.app-btn {
  position: relative;
  margin-left: 3px;
  margin-right: 3px;
}

.app-instance-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--windows-blue);
}

.app-btn > .icon {
  max-width: 60%;
  max-height: 60%;
  width: auto;
  height: auto;
}
</style>
