<template>
  <img src="./icon.png" alt="Calculator icon" class="calculator-icon">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "CalculatorIcon",
});
</script>

<style scoped>
.calculator-icon {
  width: 1rem;
  height: 1rem;
}
</style>
