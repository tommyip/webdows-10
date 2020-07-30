<template>
  <button @click="start">
    <svg width="2490" height="2500" viewBox="0 0 256 257">
      <path d="M0 36.357L104.62 22.11l.045 100.914-104.57.595L0 36.358zm104.57 98.293l.08 101.002L.081 221.275l-.006-87.302 104.494.677zm12.682-114.405L255.968 0v121.74l-138.716 1.1V20.246zM256 135.6l-.033 121.191-138.716-19.578-.194-101.84L256 135.6z"></path>
    </svg>
  </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartButton',
  setup() {
    const start = () => console.log('Start button clicked');

    return { start };
  },
});
</script>

<style scoped>
button {
  display: block;
  width: 50px;
  height: 100%;
  background-color: inherit;
  color: white;
  border: 0;
  padding: 0;
  cursor: pointer;
}

button:hover {
  background-color: rgb(117, 117, 117);
}

svg {
  width: 50%;
  height: 50%;
  fill: var(--text-dark-bg);
}
</style>
