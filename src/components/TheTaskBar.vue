<template>
  <div class="task-bar">
    <TheStartButton />
    <template v-for="[id, instance] of appInstances">
      <button class="task-btn" :key="id" @click="onTaskBtnClick(id)">
        <component :is="instance.iconComponent" class="icon" />
      </button>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject, PropType } from 'vue';
import { InstanceID, AppInstances } from '../App.vue';
import TheStartButton from './TheStartButton.vue';

import CalculatorIcon from './CalculatorApplication/Icon.vue';

export default defineComponent({
  name: 'TheTaskBar',
  components: {
    TheStartButton,
    CalculatorIcon,
  },
  setup(props, { emit }) {
    const appInstances = inject('appInstances');

    const onTaskBtnClick = (id: InstanceID) => {
      emit('app-visibility-toggle', id);
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
  width: 60%;
  height: 60%;
}
</style>
