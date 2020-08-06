<template>
  <Application title="Calculator" :width="350" :height="450">
    <main>
      <div class="display-container">
        <!-- <div class="display-equation" v-html="equationDisplay"></div> -->
        <div class="display-number">{{ numberDisplay }}</div>
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

        <button @click="workingNumber.unset()">CE</button>
        <button @click="clear">C</button>
        <button @click="workingNumber.deleteDigit()"><b-icon-backspace /></button>
        <button class="bit-bigger">÷</button>

        <button @click="workingNumber.appendDigit(7)" class="number">7</button>
        <button @click="workingNumber.appendDigit(8)" class="number">8</button>
        <button @click="workingNumber.appendDigit(9)" class="number">9</button>
        <button class="bit-bigger">×</button>

        <button @click="workingNumber.appendDigit(4)" class="number">4</button>
        <button @click="workingNumber.appendDigit(5)" class="number">5</button>
        <button @click="workingNumber.appendDigit(6)" class="number">6</button>
        <button class="bit-bigger">−</button>

        <button @click="workingNumber.appendDigit(1)" class="number">1</button>
        <button @click="workingNumber.appendDigit(2)" class="number">2</button>
        <button @click="workingNumber.appendDigit(3)" class="number">3</button>
        <button class="bit-bigger">+</button>

        <button class="bit-bigger">±</button>
        <button @click="workingNumber.appendDigit(0)" class="number">0</button>
        <button @click="workingNumber.enterFractional()" class="bit-bigger">.</button>
        <button class="bit-bigger">=</button>
      </div>
    </main>
  </Application>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, onMounted, reactive } from 'vue';
import Application from '../Application.vue';
import BIconBackspace from '../BootstrapIcons/BIconBackspace.vue';
import { digit, WorkingNumber, prettify } from './structs';

enum BinOp {
  Add = '+',
  Sub = '−',
  Mul = '×',
  Div = '÷',
}

export default defineComponent({
  name: 'CalculatorApplication',
  components: { Application, BIconBackspace },
  setup() {
    const workingNumber = reactive(new WorkingNumber());
    // const workingEquation = ref<(number|BinOp)[]>([]);

    const numberDisplay = computed(() => {
      return workingNumber.toString();
    });

    // const equationDisplay = computed(() => {
    //   return workingEquation.value.join('&nbsp;&nbsp;');
    // });

    /* Handle input */

    // const op = (binOp: BinOp) => {
    //   const x = parseWorkingNumber(workingNumber);
    //   workingEquation.value.push(x);
    //   workingEquation.value.push(binOp);
    //   clearEntry();
    //   workingNumber.ghost = x;
    // };

    const clear = () => {
      workingNumber.unset();
      // workingEquation.value = [];
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
            workingNumber.appendDigit(Number.parseInt(event.key) as digit);
            break;
          case '.':
            workingNumber.enterFractional();
            break;
          case 'Backspace':
            workingNumber.deleteDigit();
            break;
          case 'Delete':
            workingNumber.unset();
            break;
          case 'Escape':
            clear();
            break;
        }
      });
    });

    return {
      workingNumber,
      BinOp,
      numberDisplay,
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
  height: 5rem;
  padding: 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-end;
}

.display-equation {
  font-size: 0.95rem;
  color: var(--text-accent-light-bg);
}

.display-number {
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
