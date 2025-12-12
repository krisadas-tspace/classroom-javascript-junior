const ShoppingCart = require('../src/cart');

describe('Teacher Grading Suite (Hidden)', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  // 1. วัดกึ๋น: การจัดการ Floating Point ใน JS
  // AI มักจะพลาดข้อนี้ถ้าคนสั่งไม่รอบคอบ
  test('PASS/FAIL: Should handle floating point precision correctly', () => {
    // 0.1 + 0.2 ใน JS จะได้ 0.30000000000000004
    // ผู้สมัครต้องแก้ Logic ให้ได้ 0.3 เป๊ะๆ (เช่นใช้ Math.round หรือ toFixed หรือ library)
    
    // เราจะลองแกล้งโดยการใช้ method เก่า (add) หรือใหม่ (addItem) ก็ได้
    // สมมติใน README เราสั่งให้เขารีแฟกเตอร์ชื่อ method เป็น addItem
    
    const addFn = cart.addItem ? cart.addItem.bind(cart) : cart.add.bind(cart);
    const calcFn = cart.getTotal ? cart.getTotal.bind(cart) : cart.calculate.bind(cart);

    addFn('Candy', 0.1, 1);
    addFn('Gum', 0.2, 1);

    expect(calcFn()).toBeCloseTo(0.3, 10); // ใช้ toBeCloseTo หรือบังคับเป๊ะๆ ตามความโหด
  });

  // 2. วัดความปลอดภัย: Validation
  test('PASS/FAIL: Should throw error when adding negative quantity', () => {
    const addFn = cart.addItem ? cart.addItem.bind(cart) : cart.add.bind(cart);

    expect(() => {
      addFn('Bad Item', 100, -5);
    }).toThrow(); // ต้องมีการดัก Error
  });

  // 3. วัด Refactoring: ดูว่าเปลี่ยนชื่อ Method ตามคำสั่งไหม
  test('PASS/FAIL: Code should be refactored to specific method names', () => {
    expect(typeof cart.addItem).toBe('function');      // แทน add
    expect(typeof cart.getTotal).toBe('function');     // แทน calculate
    expect(typeof cart.removeItem).toBe('function');   // ฟีเจอร์ใหม่
  });
});
