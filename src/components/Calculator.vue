<template>
  <Application title="Calculator" :width="350" :height="450">
    <main>
      <div class="display-container">
        <div class="display-text">{{ resultDisplay }}</div>
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

        <button @click="clearEntryPressed">CE</button>
        <button @click="clearPressed">C</button>
        <button @click="deletePressed"><b-icon-backspace /></button>
        <button class="bit-bigger">÷</button>

        <button @click="digitPressed(7)" class="number">7</button>
        <button @click="digitPressed(8)" class="number">8</button>
        <button @click="digitPressed(9)" class="number">9</button>
        <button class="bit-bigger">×</button>

        <button @click="digitPressed(4)" class="number">4</button>
        <button @click="digitPressed(5)" class="number">5</button>
        <button @click="digitPressed(6)" class="number">6</button>
        <button class="bit-bigger">−</button>

        <button @click="digitPressed(1)" class="number">1</button>
        <button @click="digitPressed(2)" class="number">2</button>
        <button @click="digitPressed(3)" class="number">3</button>
        <button class="bit-bigger">+</button>

        <button class="bit-bigger">±</button>
        <button @click="digitPressed(0)" class="number">0</button>
        <button @click="dotPressed" class="bit-bigger">.</button>
        <button class="bit-bigger">=</button>
      </div>
    </main>
  </Application>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';
import Application from './Application.vue';
import BIconBackspace from './bootstrap_icons/BIconBackspace.vue';

type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export default defineComponent({
  name: 'Calculator',
  components: { Application, BIconBackspace },
  setup() {
    const resultIsComputed = ref(false);
    const result = ref(0);
    const workingInteger = ref(0);
    const workingFractional = ref<digit[]>([]);
    const resultDisplay = computed(() => {
      if (resultIsComputed.value) {
        return result.value.toLocaleString('en', { useGrouping: true });
      } else {
        // Could have dangling 0s
        let out = workingInteger.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (workingFractional.value.length > 0) {
          out += '.' + workingFractional.value.join('');
        }
        return out;
      }
    });

    let enteringFractional = false;
    const digitPressed = (digit: digit) => {
      if (!resultIsComputed.value) {
        if (enteringFractional) {
          workingFractional.value.push(digit);
        } else {
          workingInteger.value = workingInteger.value * 10 + digit;
        }
      }
    };

    const dotPressed = () => {
      if (!resultIsComputed.value && workingFractional.value.length === 0) {
        enteringFractional = !enteringFractional;
      }
    };

    const deletePressed = () => {
      if (workingFractional.value.length > 0) {
        workingFractional.value.pop();
        if (workingFractional.value.length === 0) {
          enteringFractional = false;
        }
      } else {
        workingInteger.value = Math.trunc(workingInteger.value / 10);
      }
    };

    const clearEntryPressed = () => {
      result.value = 0;
      enteringFractional = false;
    };

    const clearPressed = () => {
      result.value = 0;
      enteringFractional = false;
    }

    return {
      resultDisplay,
      digitPressed,
      dotPressed,
      deletePressed,
      clearEntryPressed,
      clearPressed,
    };
  },
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
