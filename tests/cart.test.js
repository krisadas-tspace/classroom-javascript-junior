const ShoppingCart = require('../src/cart');

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('addItem', () => {
    test('should add item to cart successfully', () => {
      cart.addItem('Apple', 0.5, 3);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].name).toBe('Apple');
    });

    test('should throw error when price is negative', () => {
      expect(() => {
        cart.addItem('Apple', -0.5, 3);
      }).toThrow('Price cannot be negative');
    });

    test('should throw error when quantity is negative', () => {
      expect(() => {
        cart.addItem('Apple', 0.5, -3);
      }).toThrow('Quantity cannot be negative');
    });

    test('should allow zero price', () => {
      expect(() => {
        cart.addItem('Free Sample', 0, 1);
      }).not.toThrow();
    });
  });

  describe('getTotal', () => {
    test('should return 0 for empty cart', () => {
      expect(cart.getTotal()).toBe(0);
    });

    test('should calculate total correctly for single item', () => {
      cart.addItem('Apple', 0.5, 3);
      expect(cart.getTotal()).toBe(1.5);
    });

    test('should calculate total correctly for multiple items', () => {
      cart.addItem('Apple', 0.5, 3);
      cart.addItem('Orange', 0.75, 2);
      expect(cart.getTotal()).toBe(3);
    });

    test('should handle floating point precision correctly', () => {
      // The classic JavaScript floating point problem: 0.1 + 0.2 = 0.30000000000000004
      cart.addItem('Item', 0.1, 3);
      expect(cart.getTotal()).toBe(0.3); // Should be exactly 0.3
    });

    test('should handle complex decimal calculations', () => {
      cart.addItem('Item1', 0.1, 3);
      cart.addItem('Item2', 0.2, 2);
      expect(cart.getTotal()).toBe(0.7);
    });
  });

  describe('applyDiscount', () => {
    beforeEach(() => {
      cart.addItem('Apple', 10, 2); // Total: 20
    });

    test('should apply 10% discount correctly', () => {
      const discounted = cart.applyDiscount(10);
      expect(discounted).toBe(18);
    });

    test('should apply 50% discount correctly', () => {
      const discounted = cart.applyDiscount(50);
      expect(discounted).toBe(10);
    });

    test('should return same total with 0% discount', () => {
      const discounted = cart.applyDiscount(0);
      expect(discounted).toBe(20);
    });

    test('should return 0 with 100% discount', () => {
      const discounted = cart.applyDiscount(100);
      expect(discounted).toBe(0);
    });

    test('should throw error for negative discount', () => {
      expect(() => {
        cart.applyDiscount(-10);
      }).toThrow('Discount percent must be between 0 and 100');
    });

    test('should throw error for discount over 100', () => {
      expect(() => {
        cart.applyDiscount(150);
      }).toThrow('Discount percent must be between 0 and 100');
    });

    test('should not modify cart state', () => {
      const totalBefore = cart.getTotal();
      cart.applyDiscount(10);
      const totalAfter = cart.getTotal();
      expect(totalBefore).toBe(totalAfter);
    });
  });

  describe('removeItem', () => {
    beforeEach(() => {
      cart.addItem('Apple', 0.5, 3);
      cart.addItem('Orange', 0.75, 2);
      cart.addItem('Banana', 0.3, 5);
    });

    test('should remove existing item', () => {
      const removed = cart.removeItem('Orange');
      expect(removed).toBe(true);
      expect(cart.items.length).toBe(2);
      expect(cart.items.find(item => item.name === 'Orange')).toBeUndefined();
    });

    test('should return false when item not found', () => {
      const removed = cart.removeItem('Mango');
      expect(removed).toBe(false);
      expect(cart.items.length).toBe(3);
    });

    test('should update total after removing item', () => {
      const totalBefore = cart.getTotal();
      cart.removeItem('Apple'); // Removes 1.5
      const totalAfter = cart.getTotal();
      expect(totalAfter).toBe(totalBefore - 1.5);
    });

    test('should remove only first occurrence if duplicates exist', () => {
      cart.addItem('Apple', 0.5, 1); // Add duplicate
      expect(cart.items.length).toBe(4);
      cart.removeItem('Apple');
      expect(cart.items.length).toBe(3);
    });
  });

  describe('Integration tests', () => {
    test('should handle complete shopping workflow', () => {
      // Add items
      cart.addItem('Laptop', 999.99, 1);
      cart.addItem('Mouse', 29.99, 2);
      cart.addItem('Keyboard', 79.99, 1);
      
      // Check total
      expect(cart.getTotal()).toBe(1139.96);
      
      // Remove an item
      cart.removeItem('Mouse');
      expect(cart.getTotal()).toBe(1079.98);
      
      // Apply discount
      const discounted = cart.applyDiscount(15);
      expect(discounted).toBe(917.98);
      
      // Original total should remain unchanged
      expect(cart.getTotal()).toBe(1079.98);
    });
  });
});
