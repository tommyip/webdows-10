<template>
  <Application title="Calculator" :width="350" :height="450">
    <main>
      <div class="display-container">
        <div class="display-text">0</div>
      </div>
      <div class="buttons-container">
        <button>%</button>
        <button>√𝑥</button>
        <button>𝑥<sup>2</sup></button>
        <button>
          <sup>1</sup>
          <small>╱</small>
          <sub>𝑥</sub>
        </button>

        <button>CE</button>
        <button>C</button>
        <button><b-icon-backspace /></button>
        <button class="bit-bigger">÷</button>

        <button class="number">7</button>
        <button class="number">8</button>
        <button class="number">9</button>
        <button class="bit-bigger">×</button>

        <button class="number">4</button>
        <button class="number">5</button>
        <button class="number">6</button>
        <button class="bit-bigger">−</button>

        <button class="number">1</button>
        <button class="number">2</button>
        <button class="number">3</button>
        <button class="bit-bigger">+</button>

        <button class="bit-bigger">±</button>
        <button class="number">0</button>
        <button class="bit-bigger">.</button>
        <button class="bit-bigger">=</button>
      </div>
    </main>
  </Application>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Application from './Application.vue';
import BIconBackspace from './bootstrap_icons/BIconBackspace.vue';

export default defineComponent({
  name: 'Calculator',
  components: { Application, BIconBackspace },
});
</script>

<style scoped>
main {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  height: 100%;
}

.display-container {
  height: 4.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.display-text {
  font-size: 2.5rem;
  font-weight: 600;
}

.buttons-container {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 3px;
}

.buttons-container > button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background-color: #ececec;
  font-weight: 300;
}

.buttons-container > button.number {
  background-color: #f8f8f8;
  font-weight: 600;
}

.buttons-container > button.bit-bigger {
  font-size: 1.5rem;
}

.buttons-container > button:hover {
  background-color: var(--light-bg-hover);
}

sup {
  all: unset;
  transform: translateY(-0.2rem);
  font-size: 0.9rem;
}

sub {
  all: unset;
  transform: translateY(0.2rem);
  font-size: 0.9rem;
}
</style>
