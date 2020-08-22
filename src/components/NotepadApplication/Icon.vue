<template>
  <img src="./icon.png" alt="Notepad icon" class="notepad-icon">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "NotepadIcon",
});
</script>

<style scoped>
.notepad-icon {
  width: 1rem;
  height: 1rem;
}
</style>
