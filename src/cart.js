class ShoppingCart {
  constructor() {
    this.items = [];
  }

  /**
   * Add an item to the shopping cart
   * @param {string} name - Product name
   * @param {number} price - Product price
   * @param {number} quantity - Product quantity
   * @throws {Error} If price or quantity is negative
   */
  addItem(name, price, quantity) {
    // Validation
    if (price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    this.items.push({
      name: name,
      price: price,
      quantity: quantity
    });
  }

  /**
   * Calculate total price of all items in cart
   * Uses integer arithmetic to avoid floating point precision issues
   * @returns {number} Total price
   */
  getTotal() {
    let totalCents = 0;
    
    for (let item of this.items) {
      // Convert to cents (multiply by 100) to avoid floating point issues
      const priceCents = Math.round(item.price * 100);
      const itemTotalCents = priceCents * item.quantity;
      totalCents += itemTotalCents;
    }
    
    // Convert back to dollars
    return totalCents / 100;
  }

  /**
   * Apply discount percentage to total
   * @param {number} percent - Discount percentage (0-100)
   * @returns {number} Discounted total
   * @throws {Error} If percent is negative or over 100
   */
  applyDiscount(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error('Discount percent must be between 0 and 100');
    }

    const total = this.getTotal();
    const discountAmount = Math.round(total * percent) / 100;
    const discountedTotal = total - discountAmount;
    
    // Round to 2 decimal places
    return Math.round(discountedTotal * 100) / 100;
  }

  /**
   * Remove an item from cart by name
   * @param {string} name - Product name to remove
   * @returns {boolean} True if item was removed, false if not found
   */
  removeItem(name) {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.name !== name);
    return this.items.length < initialLength;
  }
}

module.exports = ShoppingCart;
