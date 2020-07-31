<template>
  <button @click="onStartBtnClick">
    <svg width="2490" height="2500" viewBox="0 0 256 257">
      <path d="M0 36.357L104.62 22.11l.045 100.914-104.57.595L0 36.358zm104.57 98.293l.08 101.002L.081 221.275l-.006-87.302 104.494.677zm12.682-114.405L255.968 0v121.74l-138.716 1.1V20.246zM256 135.6l-.033 121.191-138.716-19.578-.194-101.84L256 135.6z"></path>
    </svg>
  </button>
  <StartMenu class="start-menu" :isOpen="toggle" />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import StartMenu from './StartMenu.vue';

export default defineComponent({
  name: 'StartButton',
  components: {
    StartMenu,
  },
  setup(_props, context) {
    const toggle = ref(false);
    const onStartBtnClick = () => toggle.value = !toggle.value;

    return { toggle, onStartBtnClick };
  },
});
</script>

<style scoped>
button {
  display: block;
  width: 50px;
  background-color: inherit;
  border: 0;
  outline: none;
  box-shadow: none;
  /* Align the webdow icon center better */
  padding-top: 3px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(192, 192, 192);
}

svg {
  width: 50%;
  height: 50%;
  fill: var(--light-dark-bg);
}

.start-menu {
  position: absolute;
}
</style>
