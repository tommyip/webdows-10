<template>
  <div class="container" :style="windowStyling">
    <header>
      <div
        @mousedown.stop="onHeaderMouseDown"
        @mousemove.stop="onHeaderMouseMove"
        @mouseup.stop="onHeaderMouseUp"
        class="title-container v-center"
      >
        <div>{{ title }}</div>
      </div>
      <div class="controls">
        <button class="minimize v-center">
          <b-icon-dash />
        </button>
        <button class="maximize v-center">
          <b-icon-stop />
        </button>
        <button class="close v-center">
          <b-icon-x />
        </button>
      </div>
    </header>
    <main>
      <slot>
        My awesome Webdows application
      </slot>
    </main>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';
import BIconDash from './bootstrap_icons/BIconDash.vue';
import BIconStop from './bootstrap_icons/BIconStop.vue';
import BIconX from './bootstrap_icons/BIconX.vue';

export default defineComponent({
  name: 'Application',
  components: {
    BIconDash,
    BIconStop,
    BIconX,
  },
  props: {
    title: String,
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 600,
    },
  },
  setup(props) {
    const title = ref(props.title);
    const width = ref(props.width);
    const height = ref(props.height);
    const locX = ref(50);
    const locY = ref(50);
    const isDragging = ref(false);
    const windowStyling = computed(() => {
      return {
        width: width.value + 'px',
        height: height.value + 'px',
        transform: `translate(${locX.value}px, ${locY.value}px)`,
        cursor: isDragging.value ? 'grabbing' : 'initial',
      };
    });

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

    return {
      title,
      windowStyling,
      onHeaderMouseDown,
      onHeaderMouseMove,
      onHeaderMouseUp
    };
  },
});
</script>

<style scoped>
.container {
  background-color: var(--light-bg);
  display: flex;
  flex-flow: column nowrap;

  box-shadow: 0 0 20px -5px black;
}

header,
.controls {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
}

header {
  height: 40px;
}

.title-container {
  width: 100%;
  padding-left: 0.75rem;
  font-size: 0.9rem;
  user-select: none;
}

.controls > *:hover {
  background-color: var(--light-bg-hover);
}

.minimize,
.maximize,
.close {
  font-size: 1.1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

main {
  flex: 1;
  padding: 0.4rem;
}
</style>
