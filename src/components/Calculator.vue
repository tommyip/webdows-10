<template>
  <Application title="Calculator" :width="350" :height="400">
    My awesome calculator
  </Application>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Application from './Application.vue';

export default defineComponent({
  name: 'Calculator',
  components: { Application },
});
</script>

<style scoped>

</style>
