<template>
  <div
    class="menu-bar"
    @mouseleave="onMenuUnfocus"
  >
    <div
      v-for="entry in menu"
      :key="entry.label"
      class="entry-wrapper"
    >
      <button
        @click="onMenuEntryClick(entry.label)"
        @mouseenter="onMenuEntryEnter(entry.label)"
        class="entry-btn"
        :class="{ selected: activeMenuEntry === entry.label }"
      >
        {{ entry.label }}
      </button>

      <div v-if="activeMenuEntry === entry.label" class="entry-menu">
        <div v-for="item in entry.items" :key="item.id">
          <button v-if="item.label !== ''" class="item-btn">
            {{ item.label }}
          </button>
          <hr v-else class="item-separater" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { InstanceID, uniqueId } from '../utils';

interface MenuItem {
  label: string;
  callback?: () => void;
}

interface MenuItemWithId extends MenuItem {
  id: InstanceID;
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

    const onMenuEntryEnter = (entry: string) => {
      if (activeMenuEntry.value !== null) {
        activeMenuEntry.value = entry;
      }
    };

    const onMenuUnfocus = () => {
      if (activeMenuEntry.value !== null) {
        activeMenuEntry.value = null;
      }
    };

    return {
      menu,
      activeMenuEntry,
      onMenuEntryClick,
      onMenuEntryEnter,
      onMenuUnfocus,
    };
  },
});
</script>

<style scoped>
.menu-bar {
  --entry-btn-margin: 2px;
  --entry-btn-height: 1.1rem;

  display: flex;
  flex-flow: row nowrap;

  font-size: 0.8rem;
}

.entry-wrapper {
  position: relative;
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

.entry-menu {
  position: absolute;
  left: 1px;
  border: 1px solid #bbbbbb;
  background-color: #f1f1f1;
  padding: 2px 0;

  display: flex;
  flex-flow: column nowrap;
  min-width: 12rem;
}

.entry-menu > div {
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
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
