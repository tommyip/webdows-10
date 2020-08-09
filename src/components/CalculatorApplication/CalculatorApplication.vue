<template>
  <Application title="Calculator" :width="350" :height="450" :id="id">
    <main>
      <div class="display-container">
        <div class="display-equation" v-html="equationDisplay"></div>
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

        <button @click="clearEntry">CE</button>
        <button @click="clear">C</button>
        <button @click="workingNumber.deleteDigit()"><b-icon-backspace /></button>
        <button @click="op('/')" class="bit-bigger">÷</button>

        <button @click="appendDigit(7)" class="number">7</button>
        <button @click="appendDigit(8)" class="number">8</button>
        <button @click="appendDigit(9)" class="number">9</button>
        <button @click="op('*')" class="bit-bigger">×</button>

        <button @click="appendDigit(4)" class="number">4</button>
        <button @click="appendDigit(5)" class="number">5</button>
        <button @click="appendDigit(6)" class="number">6</button>
        <button @click="op('-')" class="bit-bigger">−</button>

        <button @click="appendDigit(1)" class="number">1</button>
        <button @click="appendDigit(2)" class="number">2</button>
        <button @click="appendDigit(3)" class="number">3</button>
        <button @click="op('+')" class="bit-bigger">+</button>

        <button class="bit-bigger">±</button>
        <button @click="appendDigit(0)" class="number">0</button>
        <button @click="enterFractional" class="bit-bigger">.</button>
        <button @click="calculate" class="bit-bigger">=</button>
      </div>
    </main>
  </Application>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, computed, onMounted } from 'vue';
import { digit, WorkingNumber, prettify } from './structs';
import Application from '../Application.vue';
import BIconBackspace from '../BootstrapIcons/BIconBackspace.vue';

type BinOp = '+' | '-' | '*' | '/';

function displayBinOp(binOp: BinOp) {
  switch (binOp) {
    case '+':
      return '+';
    case '-':
      return '-';
    case '*':
      return '×';
    case '/':
      return '÷';
  };
}

function isBinOp(value: any): value is BinOp {
  return ['+', '-', '*', '/'].includes(value);
}

type InputState = {
  state: 'input';
  ghost?: number;
};

type AutoCalculatedState = {
  state: 'autoCalc';
  result: number;
};

type CalculatedState = {
  state: 'calc';
  result: number;
};

type AppState = InputState | AutoCalculatedState | CalculatedState;

export default defineComponent({
  name: 'CalculatorApplication',
  components: { Application, BIconBackspace },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const appState = ref<AppState>({ state: 'input' });
    const workingNumber = ref(new WorkingNumber());
    const workingEquation: Ref<(number|BinOp)[]> = ref([]);

    const numberDisplay = computed(() => {
      switch (appState.value.state) {
        case 'input':
          if (appState.value.ghost === undefined) {
            return workingNumber.value.toString();
          } else {
            return appState.value.ghost;
          }
        case 'autoCalc':
        case 'calc':
          return appState.value.result.toString();
      };
    });

    const appendDigit = (digit: digit) => {
      if (appState.value.state !== 'calc') {
        appState.value = { state: 'input' };
        workingNumber.value.appendDigit(digit);
      }
    };

    const enterFractional = () => {
      if (appState.value.state !== 'calc') {
        appState.value = { state: 'input' };
        workingNumber.value.enterFractional();
      }
    };

    const clearEntry = () => {
      if (appState.value.state !== 'calc') {
        appState.value = { state: 'input' };
        workingNumber.value.unset();
      }
    }

    const clear = () => {
      appState.value = { state: 'input' };
      workingNumber.value.unset();
      workingEquation.value = [];
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
            workingNumber.value.deleteDigit();
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

    const equationDisplay = computed(() => {
      return workingEquation.value.map((elem: number|BinOp) => {
        return typeof elem === 'number' ? elem : displayBinOp(elem)
      }).join('&nbsp;&nbsp;');
    });

    const evalEquation = (): number => {
        const expr = `return ${workingEquation.value.join(' ')};`;
        return Function(expr)();
    };

    const op = (binOp: BinOp) => {
      const x = workingNumber.value.toNumber();
      if (x === undefined) {
        if (isBinOp(workingEquation.value[workingEquation.value.length - 1])) {
          workingEquation.value[workingEquation.value.length - 1] = binOp;
        }
      } else {
        workingEquation.value.push(x);
        workingNumber.value.unset();
        if (binOp === '+' || binOp === '-') {
          // Or last operation is *|/ already
          const result = evalEquation();
          appState.value = { state: "autoCalc", result };
        } else {
          appState.value = { state: "input", ghost: x };
        }
        workingEquation.value.push(binOp);
      }
    };

    const calculate = () => {
      const x = workingNumber.value.toNumber();
      if (x !== undefined) {
        workingEquation.value.push(x);
        workingNumber.value.unset();
      } else if (isBinOp(workingEquation.value[workingEquation.value.length - 1])) {
        workingEquation.value.pop();
      }
      const result = evalEquation();
      appState.value = { state: "calc", result };
    };

    return {
      appendDigit,
      enterFractional,
      workingNumber,
      numberDisplay,
      equationDisplay,
      clearEntry,
      clear,
      op,
      calculate,
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
