export function prettify(x: number): string {
  return x.toLocaleString('en', { useGrouping: true });
}

export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface InnerNumber {
  integer: number;
  fractional: boolean | digit[];
  ghost?: number;
}

interface Number {
  x?: InnerNumber;
}

export class WorkingNumber {
  n: Number;

  constructor() {
    this.n = { x: undefined };
  }

  unset() {
    this.n.x = undefined;
  }

  getGhost(): number | undefined {
    return this.n.x?.ghost;
  }

  toNumber(): number | undefined {
    const x = this.n.x;
    if (x) {
      const fractional = Array.isArray(x.fractional) && x.fractional.length > 0 ?
        Number.parseFloat('.' + x.fractional.join('')) : 0;
      return x.integer + fractional;
    }
    return undefined;
  }

  toString(): string {
    if (this.n.x) {
      if (this.n.x.ghost) {
        return prettify(this.n.x.ghost);
      }
      let out = prettify(this.n.x.integer);
      if (this.n.x.fractional !== false) {
        out += '.';
      }
      if (Array.isArray(this.n.x.fractional)) {
        out += this.n.x.fractional.join('');
      }
      return out;
    }
    return "0";
  }

  appendDigit(digit: digit) {
    if (this.n.x == undefined) {
      this.zeroOut();
    }

    this.n.x = <InnerNumber> this.n.x;  // TS hint
    this.n.x.ghost = undefined;

    if (this.n.x.fractional === true) {
      this.n.x.fractional = [];
    }

    if (this.n.x.fractional) {
      this.n.x.fractional.push(digit);
    } else {
      this.n.x.integer = this.n.x.integer * 10 + digit;
    }
  }

  enterFractional() {
    if (this.n.x === undefined) {
      this.zeroOut();
    }

    this.n.x = <InnerNumber> this.n.x;  // TS hint
    this.n.x.ghost = undefined;

    if (typeof this.n.x.fractional === 'boolean') {
      this.n.x.fractional = !this.n.x.fractional;
    }
  }

  deleteDigit() {
    if (this.n.x) {
      if (Array.isArray(this.n.x.fractional)) {
        this.n.x.fractional.pop();
        if (this.n.x.fractional.length === 0) {
          this.n.x.fractional = true;
        }
      } else if (this.n.x.fractional === true) {
        this.n.x.fractional = false;
      } else {
        this.n.x.integer = Math.trunc(this.n.x.integer / 10);
        if (this.n.x.integer === 0) {
          this.unset();
        }
      }
    }
  }

  private zeroOut() {
    this.n.x = {
      integer: 0,
      fractional: false,
    };
  }
}
