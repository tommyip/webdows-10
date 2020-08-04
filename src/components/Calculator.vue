<template>
  <Application title="Calculator" :width="350" :height="450">
    <main>
      <div class="display-container">
        <div class="display-text">{{ display }}</div>
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

        <button @click="clearEntry">CE</button>
        <button @click="clear">C</button>
        <button @click="deleteDigit"><b-icon-backspace /></button>
        <button class="bit-bigger">÷</button>

        <button @click="appendDigit(7)" class="number">7</button>
        <button @click="appendDigit(8)" class="number">8</button>
        <button @click="appendDigit(9)" class="number">9</button>
        <button class="bit-bigger">×</button>

        <button @click="appendDigit(4)" class="number">4</button>
        <button @click="appendDigit(5)" class="number">5</button>
        <button @click="appendDigit(6)" class="number">6</button>
        <button class="bit-bigger">−</button>

        <button @click="appendDigit(1)" class="number">1</button>
        <button @click="appendDigit(2)" class="number">2</button>
        <button @click="appendDigit(3)" class="number">3</button>
        <button class="bit-bigger">+</button>

        <button class="bit-bigger">±</button>
        <button @click="appendDigit(0)" class="number">0</button>
        <button @click="enterFractional" class="bit-bigger">.</button>
        <button class="bit-bigger">=</button>
      </div>
    </main>
  </Application>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, onMounted, reactive } from 'vue';
import Application from './Application.vue';
import BIconBackspace from './bootstrap_icons/BIconBackspace.vue';

type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
enum BinOp {
  Add,
  Sub,
  Mul,
  Div
}

interface WorkingNumber {
  integer: number;
  fractional: boolean | digit[];
}

function parseWorkingNumber(wn: WorkingNumber): number {
  const fractional = Array.isArray(wn.fractional) && wn.fractional.length > 0 ?
    Number.parseFloat('.' + wn.fractional.join('')) : 0;
  return wn.integer + fractional;
}

function numberPretty(x: number): string {
  return x.toLocaleString('en', { useGrouping: true });
}

export default defineComponent({
  name: 'Calculator',
  components: { Application, BIconBackspace },
  setup() {
    const workingNumber = ref<WorkingNumber>({
      integer: 0,
      fractional: false,
    });

    const display = computed(() => {
      // Could have dangling 0s
      let out = numberPretty(workingNumber.value.integer);
      if (workingNumber.value.fractional != false) {
        out += '.';
      }
      if (Array.isArray(workingNumber.value.fractional)) {
        out += workingNumber.value.fractional.join('');
      }
      return out;
    });

    /* Handle input */

    let enteringFractional = false;
    const appendDigit = (digit: digit) => {
      if (workingNumber.value.fractional === true) {
        workingNumber.value.fractional = [];
      }

      if (workingNumber.value.fractional) {
        workingNumber.value.fractional.push(digit);
      } else {
        workingNumber.value.integer = workingNumber.value.integer * 10 + digit;
      }
    };

    const enterFractional = () => {
      if (typeof workingNumber.value.fractional === "boolean") {
        workingNumber.value.fractional = !workingNumber.value.fractional;
      }
    };

    const deleteDigit = () => {
      if (Array.isArray(workingNumber.value.fractional)) {
        workingNumber.value.fractional.pop();
        if (workingNumber.value.fractional.length === 0) {
          workingNumber.value.fractional = true;
        }
      } else if (workingNumber.value.fractional === true) {
        workingNumber.value.fractional = false;
      } else {
        workingNumber.value.integer = Math.trunc(workingNumber.value.integer / 10);
      }
    };

    const clearEntry = () => {
      workingNumber.value = {
        integer: 0,
        fractional: false,
      };
    };

    const clear = () => {
      clearEntry();
    };

    onMounted(() => {
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        switch (event.key) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            appendDigit(Number.parseInt(event.key) as digit);
            break;
          case '.':
            enterFractional();
            break;
          case 'Backspace':
            deleteDigit();
            break;
          case 'Delete':
            clearEntry();
            break;
          case 'Escape':
            clear();
            break;
        }
      });
    });

    return {
      display,
      appendDigit,
      enterFractional,
      deleteDigit,
      clearEntry,
      clear,
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
