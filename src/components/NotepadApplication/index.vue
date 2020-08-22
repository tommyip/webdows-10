<template>
  <Application
    :width="500"
    :height="400"
    :id="id"
    :menu="menu"
    class="container"
  >
    <template v-slot:header>
      <NotepadIcon />&nbsp;{{ filename }} - Notepad
    </template>

    <textarea class="notepad"></textarea>
  </Application>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Application from '../Application.vue';
import { Menu } from '../MenuBar.vue';

import NotepadIcon from './Icon.vue';
export { NotepadIcon };

export default defineComponent({
  name: 'NotepadApplication',
  components: {
    Application,
    NotepadIcon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const filename = ref('Untitled');
    const menu: Menu = [
      {
        label: 'File',
        items: [
          { label: 'New', callback: () => {} },
          { label: 'Open...', callback: () => {} },
          { label: 'Save', callback: () => {} },
          { label: 'Save As...', callback: () => {} },
          { label: '' },
          { label: 'Page Setup...', callback: () => {} },
          { label: 'Print...', callback: () => {} },
          { label: '' },
          { label: 'Exit', callback: () => {} },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo' },
          { label: '' },
          { label: 'Cut' },
          { label: 'Copy' },
          { label: 'Paste' },
          { label: 'Delete' },
          { label: '' },
          { label: 'Find...' },
          { label: 'Find Next' },
          { label: 'Replace...' },
          { label: 'Go To...' },
          { label: '' },
          { label: 'Select All' },
          { label: 'Time/Date' },
        ],
      },
      { label: 'Format', items: [] },
      { label: 'View', items: [] },
      { label: 'Help', items: [] },
    ];

    return {
      filename,
      menu,
    };
  },
});
</script>

<style scoped>
.container {
  border: 1px solid #3f3f3f;
}

.notepad {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  resize: none;
  border: none;
  outline: none;

  overflow-y: scroll;
  overflow-x: auto;

  border-top: 1px solid var(--light-bg);
}
</style>
