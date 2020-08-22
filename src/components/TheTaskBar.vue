<template>
  <div class="task-bar">
    <TheStartButton />
    <template v-for="[id, instance] of appInstances">
      <button class="task-btn" :key="id" @click="onTaskBtnClick(id)">
        <component :is="instance.value.iconComponent" class="icon" />
      </button>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { InstanceID, AppInstances } from '../App.vue';
import TheStartButton from './TheStartButton.vue';

import CalculatorIcon from './CalculatorApplication/Icon.vue';
import NotepadIcon from './NotepadApplication/Icon.vue';

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
    const appInstances = props.appInstances;

    const onTaskBtnClick = (id: InstanceID) => {
      emit('app-visibility-toggle', id);
      console.log([...appInstances]);
    };

    return {
      appInstances,
      onTaskBtnClick,
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

.task-btn {
  position: relative;
  margin-left: 3px;
  margin-right: 3px;
}

.task-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--windows-blue);
}

.task-btn > .icon {
  max-width: 60%;
  max-height: 60%;
  width: auto;
  height: auto;
}
</style>
