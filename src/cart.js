// 🚨 DO NOT CHANGE THE CLASS NAME "ShoppingCart"
// But feel free to refactor the methods inside.

class ShoppingCart {
  constructor() {
    this.i = []; // items
  }

  // n = name, p = price, q = quantity
  add(n, p, q) {
    this.i.push({ n: n, p: p, q: q });
  }

  calculate() {
    let t = 0;
    for (let x of this.i) {
      // BUG WARNING: JavaScript floating point math is tricky!
      // Try adding item price 0.1 with qty 3. Does it equal 0.3?
      t += x.p * x.q;
    }
    return t;
  }

  // This function is supposed to return the discounted total
  // but it changes nothing in the class state
  discount(pct) {
    let total = this.calculate();
    return total - (total * pct / 100);
  }
}

module.exports = ShoppingCart;
