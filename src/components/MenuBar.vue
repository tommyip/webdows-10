<template>
  <div class="menu-bar">
    <button
      v-for="entry in menu"
      :key="entry.label"
      @click="onMenuEntryClick(entry.label)"
      class="entry-btn"
      :class="{ selected: activeMenuEntry === entry.label }"
    >
      {{ entry.label }}

      <div v-if="activeMenuEntry === entry.label" class="entry-container">
        <div class="entry-items">
          <div v-for="item in entry.items" :key="item.id">
            <button v-if="item.label !== ''" class="item-btn">{{ item.label }}</button>
            <hr v-else class="item-separater" />
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { uniqueId } from '../utils';

interface MenuItem {
  label: string;
  callback?: () => void;
}

interface MenuItemWithId extends MenuItem {
  id: string;
}

interface MenuEntry {
  label: string;
  items: MenuItem[];
}

export type Menu = MenuEntry[];

export default defineComponent({
  name: 'MenuBar',
  props: {
    menu: {
      type: Array as PropType<Menu>,
      required: true,
    },
  },
  setup(props) {
    const menu = props.menu.map(({ label, items }) => {
      return {
        label,
        items: items.map(item => {
          return { ...item, id: uniqueId() };
        }),
      };
    });

    const activeMenuEntry = ref<string|null>(null);
    const onMenuEntryClick = (entry: string) => {
      activeMenuEntry.value = entry === activeMenuEntry.value ? null : entry;
    };

    return {
      menu,
      activeMenuEntry,
      onMenuEntryClick,
    };
  },
});
</script>

<style scoped>
.menu-bar {
  --entry-btn-margin: 0.05rem;
  --entry-btn-height: 1.1rem;

  display: flex;
  flex-flow: row nowrap;

  font-size: 0.8rem;
}

.entry-btn {
  padding: 0 0.4rem;
  height: var(--entry-btn-height);
  margin-left: var(--entry-btn-margin);
  margin-right: var(--entry-btn-margin);
  position: relative;
}

.entry-btn:hover,
.entry-btn.selected {
  outline: 1px solid #b6c1ff;
  background-color: #dbe9ff;
}

.entry-container {
  position: absolute;
  left: -1px;
  top: var(--entry-btn-height);
  border: 1px solid #bbbbbb;
  background-color: #f1f1f1;
  padding: 2px 0;

  display: flex;
  flex-flow: row nowrap;
}

.entry-items > * {
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  min-width: 12rem;
}

.item-btn {
  padding: 0.2rem;
  vertical-align: middle;
}

.item-separater {
  margin: 2px 0;
  width: 100%;
  border-top: 1px solid #cccccc;
}
</style>
