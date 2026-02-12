// // Cart Management System with MongoDB
// class CartManager {
//   constructor() {
//     this.cart = [];
//     this.loadCart();
//   }

//   async loadCart() {
//     try {
//       const response = await fetch('/api/cart');
//       if (response.ok) {
//         this.cart = await response.json();
//         this.updateCartBadge();
//       } else if (response.status === 401) {
//         // Not authenticated, use empty cart
//         this.cart = [];
//       }
//     } catch (error) {
//       console.error('Error loading cart:', error);
//       this.cart = [];
//     }
//   }

//   async addToCart(product) {
//     try {
//       const response = await fetch('/api/cart', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: product.id,
//           name: product.name,
//           price: product.price,
//           image: product.image
//         })
//       });

//       if (response.ok) {
//         this.cart = await response.json();
//         this.updateCartBadge();
//         this.showNotification(`${product.name} added to cart!`);
//       } else if (response.status === 401) {
//         window.location.href = '/';
//       } else if (response.status === 400) {
//         const error = await response.json();
//         this.showNotification(error.error || 'Cannot add to cart', true);
//       } else {
//         this.showNotification('Failed to add to cart', true);
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       this.showNotification('Error adding to cart', true);
//     }
//   }

//   async removeFromCart(productId) {
//     try {
//       const response = await fetch(`/api/cart/${productId}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         this.cart = await response.json();
//         this.updateCartBadge();
//       }
//     } catch (error) {
//       console.error('Error removing from cart:', error);
//     }
//   }

//   async updateQuantity(productId, quantity) {
//     try {
//       const response = await fetch(`/api/cart/${productId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ quantity })
//       });

//       if (response.ok) {
//         this.cart = await response.json();
//         this.updateCartBadge();
//       }
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     }
//   }

//   getCartCount() {
//     return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
//   }

//   getCartTotal() {
//     return this.cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
//   }

//   updateCartBadge() {
//     const cartBtn = document.querySelector('a[href="cart.html"]') || document.querySelector('.action-btn[title="Cart"]');
//     if (cartBtn) {
//       let badge = cartBtn.querySelector('.badge');
//       if (!badge) {
//         badge = document.createElement('span');
//         badge.className = 'badge';
//         cartBtn.appendChild(badge);
//       }
//       const count = this.getCartCount();
//       badge.textContent = count;
//       badge.style.display = count > 0 ? 'block' : 'none';
//     }
//   }

//   showNotification(message, isError = false) {
//     const notification = document.createElement('div');
//     notification.style.cssText = `
//       position: fixed;
//       top: 100px;
//       right: 20px;
//       background: ${isError ? '#e74c3c' : 'var(--accent, #4a9e2a)'};
//       color: white;
//       padding: 1rem 1.5rem;
//       border-radius: 8px;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//       z-index: 10000;
//       animation: slideIn 0.3s ease-out;
//     `;
//     notification.textContent = message;
//     document.body.appendChild(notification);

//     setTimeout(() => {
//       notification.style.animation = 'slideOut 0.3s ease-out';
//       setTimeout(() => notification.remove(), 300);
//     }, 2000);
//   }

//   async clearCart() {
//     try {
//       // Clear cart by removing all items
//       for (const item of this.cart) {
//         await fetch(`/api/cart/${item.productId}`, { method: 'DELETE' });
//       }
//       this.cart = [];
//       this.updateCartBadge();
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//     }
//   }
// }

// // Initialize cart manager
// const cartManager = new CartManager();

// // Add to cart button handler
// document.addEventListener('click', function(e) {
//   if (e.target.closest('.btn-add-cart')) {
//     e.preventDefault();
//     const button = e.target.closest('.btn-add-cart');
//     const productCard = button.closest('[data-product-id]') || button.closest('.product-card').parentElement;
    
//     if (!productCard) return;
    
//     const productId = productCard.getAttribute('data-product-id');
//     const priceText = productCard.querySelector('.product-price')?.textContent || '';
//     const price = parseFloat(productCard.getAttribute('data-price') || priceText.replace(/[₹$,\s]/g, ''));
    
//     const product = {
//       id: productId || `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       name: productCard.querySelector('.product-name')?.textContent.trim() || 'Product',
//       price: price || 0,
//       image: productCard.querySelector('img')?.src || '',
//       rating: productCard.getAttribute('data-rating') || '0'
//     };
    
//     cartManager.addToCart(product);
//   }
// });

// // Buy Now button handler
// document.addEventListener('click', function(e) {
//   if (e.target.closest('.btn-buy-now')) {
//     e.preventDefault();
//     const button = e.target.closest('.btn-buy-now');
//     const productCard = button.closest('[data-product-id]') || button.closest('.product-card').parentElement;
    
//     if (!productCard) return;
    
//     const productId = productCard.getAttribute('data-product-id');
//     const priceText = productCard.querySelector('.product-price')?.textContent || '';
//     const price = parseFloat(productCard.getAttribute('data-price') || priceText.replace(/[₹$,\s]/g, ''));
    
//     const product = {
//       id: productId || `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       name: productCard.querySelector('.product-name')?.textContent.trim() || 'Product',
//       price: price || 0,
//       image: productCard.querySelector('img')?.src || '',
//       rating: productCard.getAttribute('data-rating') || '0',
//       quantity: 1
//     };
    
//     // Store product for checkout page
//     sessionStorage.setItem('buy_now_product', JSON.stringify(product));
//     window.location.href = 'checkout.html';
//   }
// });

// // Update cart badge on page load
// document.addEventListener('DOMContentLoaded', function() {
//   cartManager.loadCart();
// });

// // Add CSS animations
// if (!document.getElementById('cart-animations')) {
//   const style = document.createElement('style');
//   style.id = 'cart-animations';
//   style.textContent = `
//     @keyframes slideIn {
//       from {
//         transform: translateX(400px);
//         opacity: 0;
//       }
//       to {
//         transform: translateX(0);
//         opacity: 1;
//       }
//     }
//     @keyframes slideOut {
//       from {
//         transform: translateX(0);
//         opacity: 1;
//       }
//       to {
//         transform: translateX(400px);
//         opacity: 0;
//       }
//     }
//   `;
//   document.head.appendChild(style);
// }
// Enhanced Cart Management
class CartManager {
  constructor() {
    this.cart = [];
    this.init();
  }

  async init() {
    await this.loadCart();
    this.attachEventListeners();
  }

  async loadCart() {
    const response = await fetch('/api/cart');
    if (response.ok) {
      this.cart = await response.json();
      this.updateCartUI();
    }
  }

  // Unified listener to capture data correctly from HTML
  attachEventListeners() {
    document.addEventListener('click', async (e) => {
      const addBtn = e.target.closest('.btn-add-cart');
      const buyBtn = e.target.closest('.btn-buy-now');
      
      if (addBtn || buyBtn) {
        e.preventDefault();
        const card = e.target.closest('[data-product-id]');
        if (!card) return;

        const product = {
          productId: card.getAttribute('data-product-id'), // Fixed ID mapping
          name: card.querySelector('.product-name').textContent.trim(),
          price: parseFloat(card.getAttribute('data-price')),
          image: card.querySelector('img').src
        };

        if (addBtn) await this.addToCart(product);
        if (buyBtn) this.buyNow(product);
      }
    });
  }

  async addToCart(product) {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      this.cart = await response.json();
      this.updateCartUI();
      this.notify(`${product.name} added!`);
    } else {
      const err = await response.json();
      this.notify(err.error || "Action failed", true);
    }
  }

  buyNow(product) {
    // Check session via window.authUser or quick API ping
    sessionStorage.setItem('buy_now_product', JSON.stringify({ ...product, quantity: 1 }));
    window.location.href = 'checkout.html';
  }

  updateCartUI() {
    const count = this.cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
    // Only update cart badges in the header
    const cartButtons = document.querySelectorAll(
      'a[href="cart.html"], .action-btn[title="Cart"]'
    );
    cartButtons.forEach(btn => {
      let badge = btn.querySelector('.badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'badge';
        btn.appendChild(badge);
      }
      badge.textContent = count;
      badge.style.display = count > 0 ? 'block' : 'none';
    });
  }

  notify(msg, isError = false) {
    const div = document.createElement('div');
    div.className = `toast ${isError ? 'error' : 'success'}`;
    div.style.cssText = `position:fixed; top:20px; right:20px; padding:15px; background:${isError?'#ff4444':'#4caf50'}; color:white; border-radius:8px; z-index:9999;`;
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }
}

// Expose globally so other pages (like cart.html) can refresh badges
window.cartManager = new CartManager();