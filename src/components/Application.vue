<template>
  <div
    v-show="showSelf"
    class="container"
    :style="windowStyling"
   >
    <header>
      <div
        @mousedown.stop="onHeaderMouseDown"
        @mousemove.stop="onHeaderMouseMove"
        @mouseup.stop="onHeaderMouseUp"
        class="title-container v-center"
      >
        <slot name="header">Untitled application</slot>
      </div>
      <div class="controls">
        <button @click="onAppMinimized" class="minimize v-center">
          <BIconDash />
        </button>
        <button class="maximize v-center">
          <BIconStop />
        </button>
        <button @click="onAppExit" class="close v-center">
          <BIconX />
        </button>
      </div>
    </header>
    <div v-if="menu">
      <menu-bar :menu="menu" />
    </div>
    <main>
      <slot>
        My awesome Webdows application
      </slot>
    </main>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, inject, PropType } from 'vue';
import { BIconDash, BIconStop, BIconX } from 'bootstrap-icons-vue';
import { InstanceID } from '../utils';
import { AppInstance, getInstanceSym, Visibility } from '../App.vue';
import MenuBar, { Menu } from './MenuBar.vue';

export default defineComponent({
  name: 'Application',
  components: {
    MenuBar,
    BIconDash,
    BIconStop,
    BIconX,
  },
  props: {
    id: {
      type: String as PropType<InstanceID>,
      required: true,
    },
    width: {
      type: Number,
      default: 800,
      validator: (w: number) => w >= 0,
    },
    height: {
      type: Number,
      default: 600,
      validator: (h: number) => h >= 0,
    },
    menu: {
      type: Array as PropType<Menu>,
      required: false,
    },
  },
  emits: {
    'app-visibility-change': (id: InstanceID, visibility: Visibility) => true,
    'app-exit': (id: InstanceID) => true,
  },
  setup(props, { emit }) {
    const width = ref(props.width);
    const height = ref(props.height);
    const locX = ref((window.innerWidth / 2) - (props.width / 2));
    const locY = ref((window.innerHeight / 2) - (props.height / 2));
    const isDragging = ref(false);
    const windowStyling = computed(() => {
      return {
        width: width.value + 'px',
        height: height.value + 'px',
        transform: `translate(${locX.value}px, ${locY.value}px)`,
        cursor: isDragging.value ? 'grabbing' : 'initial',
      };
    });
    const self = inject(getInstanceSym)?.(props.id);
    const showSelf = computed(() => self?.value.visibility !== Visibility.Minimized);

    /* Window dragging logic */
    let initialMouseX: number;
    let initialMouseY: number;
    let initialWindowX: number;
    let initialWindowY: number;
    const onHeaderMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        isDragging.value = true;
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
        initialWindowX = locX.value;
        initialWindowY = locY.value;
      }
    };
    const onHeaderMouseMove = (event: MouseEvent) => {
      if (event.button === 0 && isDragging.value) {
        locX.value = initialWindowX + (event.clientX - initialMouseX);
        locY.value = initialWindowY + (event.clientY - initialMouseY);
      }
    };
    const onHeaderMouseUp = (event: MouseEvent) => {
      if (event.button === 0 && isDragging.value) {
        isDragging.value = false;
      }
    };

    const onAppMinimized = () => {
      emit('app-visibility-change', props.id, Visibility.Minimized);
    };

    const onAppExit = () => {
      emit('app-exit', props.id);
    };

    return {
      menu: props.menu,
      showSelf,
      windowStyling,
      onHeaderMouseDown,
      onHeaderMouseMove,
      onHeaderMouseUp,
      onAppMinimized,
      onAppExit,
    };
  },
});
</script>

<style scoped>
.container {
  position: absolute;
  background-color: var(--text-dark-bg);
  display: flex;
  flex-flow: column nowrap;

  box-shadow: 0 0 20px -5px rgb(32, 32, 32);
}

header,
.controls {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
}

header {
  height: 30px;
}

.title-container {
  width: 100%;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  user-select: none;
}

.minimize,
.maximize,
.close {
  font-size: 1.1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.minimize:hover,
.maximize:hover {
  background-color: var(--light-bg-hover);
}

.close {
  font-size: 1.4rem;
}

.close:hover {
  background-color: #E74856;
}

main {
  flex: 1;
}
</style>
