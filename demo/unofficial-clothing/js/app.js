/**
 * Unofficial Clothing - Karachi
 * Main Application Logic & Interactive State Management
 */

(function () {
  "use strict";

  // State
  const state = {
    currency: "PKR",
    cart: [
      {
        id: "uc-01",
        size: "L",
        color: "Obsidian Black",
        qty: 1
      }
    ],
    wishlist: ["uc-03", "uc-06"],
    activeFilter: "all",
    appliedPromo: null,
    promoDiscountRate: 0.10, // 10% for KARACHI10
    shippingThresholdPKR: 7500,
    standardShippingPKR: 250,
    quickViewProduct: null,
    quickViewSelectedSize: "M",
    quickViewSelectedColor: null,
    quickViewQty: 1
  };

  // DOM Elements Cache
  const DOM = {
    // Header & Badges
    header: document.getElementById("site-header"),
    cartCountBadges: document.querySelectorAll(".cart-count-badge"),
    wishlistCountBadges: document.querySelectorAll(".wishlist-count-badge"),
    currencyBtnText: document.getElementById("current-currency-label"),
    currencyDropdown: document.getElementById("currency-dropdown"),
    navToggleBtn: document.getElementById("nav-toggle-btn"),
    mainNav: document.getElementById("main-nav"),

    // Announcement Ticker
    announcementTickerText: document.getElementById("announcement-ticker-text"),

    // Grids
    productsGrid: document.getElementById("products-grid"),
    bestsellersGrid: document.getElementById("bestsellers-grid"),
    categoriesGrid: document.getElementById("categories-grid"),
    instagramGrid: document.getElementById("instagram-feed-grid"),
    filterTabs: document.querySelectorAll(".filter-tab"),

    // Cart Drawer
    cartDrawerBackdrop: document.getElementById("cart-drawer-backdrop"),
    cartDrawer: document.getElementById("cart-drawer"),
    cartCloseBtn: document.getElementById("cart-close-btn"),
    cartItemsList: document.getElementById("cart-items-list"),
    cartSubtotal: document.getElementById("cart-subtotal"),
    cartShippingFee: document.getElementById("cart-shipping-fee"),
    cartDiscountRow: document.getElementById("cart-discount-row"),
    cartDiscountAmount: document.getElementById("cart-discount-amount"),
    cartTotal: document.getElementById("cart-total"),
    cartCheckoutBtn: document.getElementById("cart-checkout-btn"),
    cartPromoInput: document.getElementById("cart-promo-input"),
    cartPromoBtn: document.getElementById("cart-promo-btn"),
    shippingMeterText: document.getElementById("shipping-meter-text"),
    shippingMeterFill: document.getElementById("shipping-meter-fill"),

    // Wishlist Drawer
    wishlistDrawerBackdrop: document.getElementById("wishlist-drawer-backdrop"),
    wishlistDrawer: document.getElementById("wishlist-drawer"),
    wishlistCloseBtn: document.getElementById("wishlist-close-btn"),
    wishlistItemsList: document.getElementById("wishlist-items-list"),

    // Quick View Modal
    quickViewBackdrop: document.getElementById("quickview-backdrop"),
    quickViewCloseBtn: document.getElementById("quickview-close-btn"),
    quickViewContainer: document.getElementById("quickview-content-target"),

    // Search Modal
    searchModalBackdrop: document.getElementById("search-modal-backdrop"),
    searchModalCloseBtn: document.getElementById("search-modal-close-btn"),
    searchInput: document.getElementById("search-input-main"),
    searchResultsGrid: document.getElementById("search-results-grid"),
    searchChips: document.querySelectorAll(".search-chip"),

    // Size Guide Modal
    sizeGuideBackdrop: document.getElementById("sizeguide-backdrop"),
    sizeGuideCloseBtn: document.getElementById("sizeguide-close-btn"),

    // Newsletter Form
    newsletterForm: document.getElementById("newsletter-form"),
    newsletterInput: document.getElementById("newsletter-email-input"),

    // Toast Container
    toastContainer: document.getElementById("toast-container")
  };

  // Announcement Messages
  const announcements = [
    "Complimentary Express Delivery Nationwide on orders above PKR 7,500",
    "Shop #G-36, Madni Mall, Block 14, Federal B Area, Karachi — WhatsApp: 0312-8400431",
    "Same-Day Courier Delivery Available Across Karachi",
    "Customer Support & Inquiries via WhatsApp: 0312-8400431"
  ];
  let announcementIndex = 0;

  // --- Formatting Helpers ---
  function formatPrice(amountPKR) {
    const curr = window.CURRENCIES[state.currency] || window.CURRENCIES.PKR;
    const converted = amountPKR * curr.rate;

    if (state.currency === "PKR") {
      return `PKR ${Math.round(converted).toLocaleString("en-PK")}`;
    } else if (state.currency === "USD") {
      return `$${Math.round(converted).toLocaleString()}`;
    } else if (state.currency === "AED") {
      return `AED ${Math.round(converted).toLocaleString()}`;
    } else if (state.currency === "GBP") {
      return `£${Math.round(converted).toLocaleString()}`;
    }
    return `PKR ${Math.round(amountPKR).toLocaleString()}`;
  }

  function getProductById(id) {
    return window.PRODUCTS.find((p) => p.id === id);
  }

  // --- Toast Notification ---
  function showToast(message, iconType = "check") {
    if (!DOM.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";

    const iconSvg =
      iconType === "check"
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-text">${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Remove after 3.2s
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, 3200);
  }

  // --- Announcement Bar Cycle ---
  function initAnnouncementTicker() {
    if (!DOM.announcementTickerText) return;
    setInterval(() => {
      DOM.announcementTickerText.style.opacity = "0.3";
      setTimeout(() => {
        announcementIndex = (announcementIndex + 1) % announcements.length;
        DOM.announcementTickerText.textContent = announcements[announcementIndex];
        DOM.announcementTickerText.style.opacity = "1";
      }, 300);
    }, 4500);
  }

  // --- Currency Switching ---
  function initCurrencySwitcher() {
    const currencyBtn = document.getElementById("currency-trigger-btn");
    if (!currencyBtn || !DOM.currencyDropdown) return;

    currencyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      DOM.currencyDropdown.classList.toggle("active");
    });

    document.addEventListener("click", () => {
      DOM.currencyDropdown.classList.remove("active");
    });

    const optButtons = DOM.currencyDropdown.querySelectorAll(".currency-opt");
    optButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-currency");
        if (window.CURRENCIES[code]) {
          state.currency = code;
          if (DOM.currencyBtnText) {
            DOM.currencyBtnText.textContent = window.CURRENCIES[code].label;
          }
          optButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          DOM.currencyDropdown.classList.remove("active");

          // Refresh prices everywhere
          renderAllProducts();
          renderBestsellers();
          renderCart();
          renderWishlist();
          if (state.quickViewProduct) {
            renderQuickView(state.quickViewProduct);
          }
          showToast(`Currency updated to ${code}`);
        }
      });
    });
  }

  // --- Render Product Card HTML ---
  function createProductCardHTML(product) {
    const isWishlisted = state.wishlist.includes(product.id);
    const hasDiscount = product.oldPricePKR && product.oldPricePKR > product.pricePKR;
    const discountPercent = hasDiscount
      ? Math.round(((product.oldPricePKR - product.pricePKR) / product.oldPricePKR) * 100)
      : 0;

    let badgeHTML = "";
    if (product.badge) {
      const badgeClass =
        product.badge.includes("SALE") || hasDiscount
          ? "badge-sale"
          : product.badge.includes("LIMITED") || product.badge.includes("GSM")
          ? "badge-accent"
          : "";
      badgeHTML = `<span class="product-badge ${badgeClass}">${product.badge}</span>`;
    }

    const swatchesHTML = (product.colors || [])
      .map(
        (c, idx) => `
        <span class="swatch-circle ${idx === 0 ? "active" : ""}" 
              style="background-color: ${c.hex};" 
              title="${c.name}"
              data-color="${c.name}"></span>
      `
      )
      .join("");

    return `
      <article class="product-card reveal-on-scroll" data-id="${product.id}">
        <div class="product-image-wrap">
          <div class="product-badge-wrap">
            ${badgeHTML}
          </div>
          
          <button class="btn-wishlist ${isWishlisted ? "active" : ""}" 
                  data-id="${product.id}" 
                  aria-label="Add to wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <img class="product-img product-img-primary" 
               src="${product.image}" 
               alt="${product.name}" 
               loading="lazy" 
               width="400" 
               height="533" />
               
          <img class="product-img product-img-hover" 
               src="${product.hoverImage || product.image}" 
               alt="${product.name} view" 
               loading="lazy" 
               width="400" 
               height="533" />

          <div class="product-quick-actions">
            <button class="btn-quick-view" data-id="${product.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Quick View
            </button>
            <button class="btn-quick-add" data-id="${product.id}">
              + Add
            </button>
          </div>
        </div>

        <div class="product-info">
          <div class="product-meta-row">
            <span class="product-category-sub">${product.category}</span>
            <span class="product-rating-pill">
              <svg width="12" height="12" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              ${product.rating}
            </span>
          </div>

          <h3 class="product-title">${product.name}</h3>

          <div class="product-pricing-wrap">
            <span class="product-price">${formatPrice(product.pricePKR)}</span>
            ${
              hasDiscount
                ? `<span class="product-price-old">${formatPrice(product.oldPricePKR)}</span>
                   <span class="product-discount-tag">-${discountPercent}%</span>`
                : ""
            }
          </div>

          <div class="product-swatches">
            ${swatchesHTML}
          </div>
        </div>
      </article>
    `;
  }

  // --- Render Categories Grid ---
  function renderCategories() {
    if (!DOM.categoriesGrid || !window.CATEGORIES) return;

    DOM.categoriesGrid.innerHTML = window.CATEGORIES.map(
      (cat) => `
      <a href="#new-arrivals" class="category-card reveal-on-scroll" data-filter="${cat.filter}">
        <div class="category-bg-wrap">
          <img class="category-img" src="${cat.image}" alt="${cat.title}" loading="lazy" />
          <div class="category-overlay"></div>
        </div>
        <div class="category-card-content">
          <span class="category-card-count">${cat.count}</span>
          <h3 class="category-card-title">${cat.title}</h3>
          <p class="category-card-tagline">${cat.tagline}</p>
          <span class="category-action-link">
            Shop Category 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </div>
      </a>
    `
    ).join("");

    // Attach click handler to filter new arrivals
    DOM.categoriesGrid.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", () => {
        const filter = card.getAttribute("data-filter");
        if (filter) {
          setActiveFilter(filter);
        }
      });
    });
  }

  // --- Render Products in New Arrivals ---
  function renderAllProducts() {
    if (!DOM.productsGrid || !window.PRODUCTS) return;

    let list = window.PRODUCTS;
    if (state.activeFilter === "men") {
      list = window.PRODUCTS.filter((p) => p.category === "men" || p.tags.includes("men"));
    } else if (state.activeFilter === "women") {
      list = window.PRODUCTS.filter((p) => p.category === "women" || p.tags.includes("women"));
    } else if (state.activeFilter === "coords") {
      list = window.PRODUCTS.filter((p) => p.category === "coords" || p.tags.includes("coords"));
    } else if (state.activeFilter === "limited") {
      list = window.PRODUCTS.filter((p) => p.category === "limited" || p.badge?.includes("LIMITED"));
    }

    DOM.productsGrid.innerHTML = list.map(createProductCardHTML).join("");
    attachProductCardEvents(DOM.productsGrid);

    // Re-trigger scroll reveal observer if active
    if (window.observeNewElements) {
      window.observeNewElements();
    }
  }

  // --- Render Best Sellers ---
  function renderBestsellers() {
    if (!DOM.bestsellersGrid || !window.PRODUCTS) return;

    const list = window.PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
    DOM.bestsellersGrid.innerHTML = list.map(createProductCardHTML).join("");
    attachProductCardEvents(DOM.bestsellersGrid);

    if (window.observeNewElements) {
      window.observeNewElements();
    }
  }

  // --- Render Instagram Feed ---
  function renderInstagramFeed() {
    if (!DOM.instagramGrid || !window.INSTAGRAM_POSTS) return;

    DOM.instagramGrid.innerHTML = window.INSTAGRAM_POSTS.map(
      (post) => `
      <div class="insta-card reveal-on-scroll">
        <img class="insta-img" src="${post.image}" alt="${post.look}" loading="lazy" />
        <div class="insta-overlay">
          <div class="insta-top">
            <span class="insta-handle">${post.handle}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </div>
          <div class="insta-bottom">
            <span class="insta-location">${post.location}</span>
            <div class="insta-tag">${post.look}</div>
          </div>
        </div>
      </div>
    `
    ).join("");
  }

  // --- Filter Tabs ---
  function setActiveFilter(filter) {
    state.activeFilter = filter;
    DOM.filterTabs.forEach((tab) => {
      if (tab.getAttribute("data-filter") === filter) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
    renderAllProducts();
  }

  function initFilters() {
    DOM.filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter");
        setActiveFilter(filter);
      });
    });
  }

  // --- Card Events (Wishlist, Quick View, Quick Add) ---
  function attachProductCardEvents(container) {
    // Wishlist Toggle
    container.querySelectorAll(".btn-wishlist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        toggleWishlist(id);
      });
    });

    // Quick View
    container.querySelectorAll(".btn-quick-view").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        openQuickView(id);
      });
    });

    // Quick Add
    container.querySelectorAll(".btn-quick-add").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const product = getProductById(id);
        if (product) {
          const defaultSize = product.sizes ? product.sizes[0] : "Standard";
          const defaultColor = product.colors ? product.colors[0].name : "Standard";
          addToCart(product.id, defaultSize, defaultColor, 1);
        }
      });
    });

    // Swatch Click
    container.querySelectorAll(".swatch-circle").forEach((swatch) => {
      swatch.addEventListener("click", (e) => {
        e.stopPropagation();
        const parent = swatch.closest(".product-swatches");
        if (parent) {
          parent.querySelectorAll(".swatch-circle").forEach((s) => s.classList.remove("active"));
          swatch.classList.add("active");
        }
      });
    });
  }

  // --- Wishlist Management ---
  function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const index = state.wishlist.indexOf(productId);
    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast(`Removed "${product.name}" from Wishlist`);
    } else {
      state.wishlist.push(productId);
      showToast(`Added "${product.name}" to Wishlist`);
    }

    updateWishlistBadges();
    renderAllProducts();
    renderBestsellers();
    renderWishlist();
  }

  function updateWishlistBadges() {
    DOM.wishlistCountBadges.forEach((b) => {
      b.textContent = state.wishlist.length;
      b.classList.remove("pulse");
      void b.offsetWidth;
      b.classList.add("pulse");
    });
  }

  function renderWishlist() {
    if (!DOM.wishlistItemsList) return;

    if (state.wishlist.length === 0) {
      DOM.wishlistItemsList.innerHTML = `
        <div class="drawer-empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h4 class="empty-title">Your Wishlist is Empty</h4>
          <p class="empty-desc">Curate your private capsule of Karachi luxury ready-to-wear.</p>
          <button class="btn btn-primary" onclick="window.closeWishlistDrawer()">Explore Collection</button>
        </div>
      `;
      return;
    }

    DOM.wishlistItemsList.innerHTML = state.wishlist
      .map((id) => {
        const p = getProductById(id);
        if (!p) return "";
        return `
        <div class="cart-item-row" data-id="${p.id}">
          <div class="cart-item-thumb">
            <img src="${p.image}" alt="${p.name}" />
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-name">${p.name}</h4>
            <div class="cart-item-price">${formatPrice(p.pricePKR)}</div>
            <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.6875rem; margin-top: 0.5rem;" onclick="window.moveWishlistToCart('${p.id}')">
              Move to Cart
            </button>
          </div>
          <button class="cart-item-remove-btn" onclick="window.removeWishlistItem('${p.id}')" aria-label="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;
      })
      .join("");
  }

  // --- Cart Management ---
  function addToCart(productId, size = "M", color = null, qty = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const chosenColor = color || (product.colors ? product.colors[0].name : "Standard");
    const existingIndex = state.cart.findIndex(
      (item) => item.id === productId && item.size === size && item.color === chosenColor
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += qty;
    } else {
      state.cart.push({
        id: productId,
        size: size,
        color: chosenColor,
        qty: qty
      });
    }

    updateCartBadges();
    renderCart();
    openCartDrawer();
    showToast(`Added "${product.name}" (${size}) to your bag`);
  }

  function updateCartQty(index, delta) {
    if (state.cart[index]) {
      state.cart[index].qty += delta;
      if (state.cart[index].qty <= 0) {
        state.cart.splice(index, 1);
        showToast("Item removed from your bag");
      }
      updateCartBadges();
      renderCart();
    }
  }

  function removeCartItem(index) {
    if (state.cart[index]) {
      state.cart.splice(index, 1);
      updateCartBadges();
      renderCart();
      showToast("Item removed from bag");
    }
  }

  function updateCartBadges() {
    const totalCount = state.cart.reduce((acc, item) => acc + item.qty, 0);
    DOM.cartCountBadges.forEach((b) => {
      b.textContent = totalCount;
      b.classList.remove("pulse");
      void b.offsetWidth;
      b.classList.add("pulse");
    });
  }

  function renderCart() {
    if (!DOM.cartItemsList) return;

    if (state.cart.length === 0) {
      DOM.cartItemsList.innerHTML = `
        <div class="drawer-empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4 class="empty-title">Your Bag is Empty</h4>
          <p class="empty-desc">Discover our latest drop crafted with bespoke Pakistani textiles.</p>
          <button class="btn btn-primary" onclick="window.closeCartDrawer()">Start Shopping</button>
        </div>
      `;

      if (DOM.shippingMeterText) {
        DOM.shippingMeterText.innerHTML = `Add <strong>${formatPrice(
          state.shippingThresholdPKR
        )}</strong> for Complimentary Delivery`;
      }
      if (DOM.shippingMeterFill) {
        DOM.shippingMeterFill.style.width = "0%";
      }
      if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatPrice(0);
      if (DOM.cartShippingFee) DOM.cartShippingFee.textContent = "—";
      if (DOM.cartTotal) DOM.cartTotal.textContent = formatPrice(0);
      if (DOM.cartCheckoutBtn) {
        DOM.cartCheckoutBtn.disabled = true;
        DOM.cartCheckoutBtn.textContent = "BAG IS EMPTY";
      }
      return;
    }

    // Populate Items
    DOM.cartItemsList.innerHTML = state.cart
      .map((item, idx) => {
        const product = getProductById(item.id);
        if (!product) return "";
        const itemTotal = product.pricePKR * item.qty;

        return `
        <div class="cart-item-row">
          <div class="cart-item-thumb">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-name">${product.name}</h4>
            <div class="cart-item-meta">Size: ${item.size} • ${item.color}</div>
            <div class="cart-item-price">${formatPrice(itemTotal)}</div>
            
            <div class="cart-item-qty-stepper">
              <button class="qty-btn" onclick="window.updateCartQty(${idx}, -1)">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="window.updateCartQty(${idx}, 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove-btn" onclick="window.removeCartItem(${idx})" aria-label="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;
      })
      .join("");

    // Calculate Totals (in PKR)
    const subtotalPKR = state.cart.reduce((acc, item) => {
      const p = getProductById(item.id);
      return acc + (p ? p.pricePKR * item.qty : 0);
    }, 0);

    const isFreeShipping = subtotalPKR >= state.shippingThresholdPKR;
    const shippingPKR = isFreeShipping ? 0 : state.standardShippingPKR;

    let discountPKR = 0;
    if (state.appliedPromo) {
      discountPKR = Math.round(subtotalPKR * state.promoDiscountRate);
      if (DOM.cartDiscountRow) {
        DOM.cartDiscountRow.style.display = "flex";
      }
      if (DOM.cartDiscountAmount) {
        DOM.cartDiscountAmount.textContent = `-${formatPrice(discountPKR)}`;
      }
    } else {
      if (DOM.cartDiscountRow) {
        DOM.cartDiscountRow.style.display = "none";
      }
    }

    const totalPKR = Math.max(0, subtotalPKR + shippingPKR - discountPKR);

    // Free shipping meter
    if (DOM.shippingMeterFill && DOM.shippingMeterText) {
      const progressPercent = Math.min(100, (subtotalPKR / state.shippingThresholdPKR) * 100);
      DOM.shippingMeterFill.style.width = `${progressPercent}%`;

      if (isFreeShipping) {
        DOM.shippingMeterFill.classList.add("unlocked");
        DOM.shippingMeterText.innerHTML = `<strong>Free Nationwide Delivery Unlocked!</strong> Dispatched from Karachi.`;
      } else {
        DOM.shippingMeterFill.classList.remove("unlocked");
        const remaining = state.shippingThresholdPKR - subtotalPKR;
        DOM.shippingMeterText.innerHTML = `Add <strong>${formatPrice(
          remaining
        )}</strong> more for Free Delivery`;
      }
    }

    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatPrice(subtotalPKR);
    if (DOM.cartShippingFee) {
      DOM.cartShippingFee.textContent = isFreeShipping ? "FREE" : formatPrice(shippingPKR);
    }
    if (DOM.cartTotal) DOM.cartTotal.textContent = formatPrice(totalPKR);

    if (DOM.cartCheckoutBtn) {
      DOM.cartCheckoutBtn.disabled = false;
      DOM.cartCheckoutBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        PROCEED TO CHECKOUT • ${formatPrice(totalPKR)}
      `;
    }
  }

  // --- Promo Code ---
  function applyPromoCode() {
    const code = (DOM.cartPromoInput?.value || "").trim().toUpperCase();
    if (!code) return;

    if (code === "KARACHI10" || code === "UNOFFICIAL") {
      state.appliedPromo = code;
      showToast(`Promo "${code}" applied: 10% Off order subtotal!`);
      renderCart();
    } else {
      showToast("Invalid promotion code. Try 'KARACHI10'", "error");
    }
  }

  // --- Drawers / Modal Controllers ---
  function openCartDrawer() {
    DOM.cartDrawerBackdrop?.classList.add("active");
    DOM.cartDrawer?.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeCartDrawer() {
    DOM.cartDrawerBackdrop?.classList.remove("active");
    DOM.cartDrawer?.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  function openWishlistDrawer() {
    renderWishlist();
    DOM.wishlistDrawerBackdrop?.classList.add("active");
    DOM.wishlistDrawer?.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeWishlistDrawer() {
    DOM.wishlistDrawerBackdrop?.classList.remove("active");
    DOM.wishlistDrawer?.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  function openSearchModal() {
    DOM.searchModalBackdrop?.classList.add("active");
    document.body.classList.add("modal-open");
    setTimeout(() => {
      DOM.searchInput?.focus();
    }, 150);
    renderSearchResults("");
  }

  function closeSearchModal() {
    DOM.searchModalBackdrop?.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (DOM.searchInput) DOM.searchInput.value = "";
  }

  function openSizeGuideModal() {
    DOM.sizeGuideBackdrop?.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeSizeGuideModal() {
    DOM.sizeGuideBackdrop?.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  // --- Quick View Modal Controller ---
  function openQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;

    state.quickViewProduct = product;
    state.quickViewSelectedSize = product.sizes ? product.sizes[0] : "M";
    state.quickViewSelectedColor = product.colors ? product.colors[0].name : "Standard";
    state.quickViewQty = 1;

    renderQuickView(product);

    DOM.quickViewBackdrop?.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeQuickView() {
    DOM.quickViewBackdrop?.classList.remove("active");
    document.body.classList.remove("modal-open");
    state.quickViewProduct = null;
  }

  function renderQuickView(product) {
    if (!DOM.quickViewContainer) return;

    const gallery = product.gallery || [product.image];
    const hasDiscount = product.oldPricePKR && product.oldPricePKR > product.pricePKR;

    const thumbnailsHTML = gallery
      .map(
        (imgUrl, idx) => `
        <div class="qv-thumb ${idx === 0 ? "active" : ""}" data-src="${imgUrl}">
          <img src="${imgUrl}" alt="${product.name} angle ${idx + 1}" />
        </div>
      `
      )
      .join("");

    const sizesHTML = (product.sizes || ["S", "M", "L", "XL"])
      .map(
        (sz) => `
        <button class="size-pill ${sz === state.quickViewSelectedSize ? "active" : ""}" data-size="${sz}">
          ${sz}
        </button>
      `
      )
      .join("");

    const detailsListHTML = (product.details || [])
      .map((d) => `<li>• ${d}</li>`)
      .join("");

    DOM.quickViewContainer.innerHTML = `
      <div class="quickview-layout">
        <div class="quickview-gallery">
          <div class="quickview-main-image-wrap">
            <img id="qv-main-img" src="${gallery[0]}" alt="${product.name}" />
          </div>
          <div class="quickview-thumbnails-row">
            ${thumbnailsHTML}
          </div>
        </div>

        <div class="quickview-info-pane">
          <span class="qv-category-tag">${product.category} / Karachi Atelier</span>
          <h2 class="qv-title">${product.name}</h2>
          
          <div class="qv-pricing-row">
            <span class="qv-price">${formatPrice(product.pricePKR)}</span>
            ${
              hasDiscount
                ? `<span class="qv-old-price">${formatPrice(product.oldPricePKR)}</span>`
                : ""
            }
          </div>

          <p class="qv-description">${product.description}</p>

          <div class="qv-field-label">
            <span>Select Size</span>
            <button type="button" class="qv-size-guide-btn" id="qv-size-guide-trigger">View Size Guide</button>
          </div>
          <div class="qv-sizes-row">
            ${sizesHTML}
          </div>

          <div class="qv-pickup-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span><strong>Karachi Store Pickup:</strong> Available at Shop #G-36, Madni Mall, Block 14, Federal B Area</span>
          </div>

          <ul style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1.5rem; list-style: none;">
            ${detailsListHTML}
          </ul>

          <div class="qv-add-row">
            <div class="qv-qty-stepper">
              <button type="button" id="qv-qty-minus">−</button>
              <span id="qv-qty-display">${state.quickViewQty}</span>
              <button type="button" id="qv-qty-plus">+</button>
            </div>
            <button class="btn btn-primary qv-btn-add" id="qv-submit-add">
              Add to Bag • ${formatPrice(product.pricePKR * state.quickViewQty)}
            </button>
          </div>
        </div>
      </div>
    `;

    // Quick View Internal Events
    // Image thumbnail click
    const thumbs = DOM.quickViewContainer.querySelectorAll(".qv-thumb");
    const mainImg = DOM.quickViewContainer.querySelector("#qv-main-img");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
        if (mainImg) {
          mainImg.src = thumb.getAttribute("data-src");
        }
      });
    });

    // Size Selection
    const sizePills = DOM.quickViewContainer.querySelectorAll(".size-pill");
    sizePills.forEach((pill) => {
      pill.addEventListener("click", () => {
        sizePills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        state.quickViewSelectedSize = pill.getAttribute("data-size");
      });
    });

    // Qty minus/plus
    const qtyMinus = DOM.quickViewContainer.querySelector("#qv-qty-minus");
    const qtyPlus = DOM.quickViewContainer.querySelector("#qv-qty-plus");
    const qtyDisplay = DOM.quickViewContainer.querySelector("#qv-qty-display");
    const submitBtn = DOM.quickViewContainer.querySelector("#qv-submit-add");

    qtyMinus?.addEventListener("click", () => {
      if (state.quickViewQty > 1) {
        state.quickViewQty--;
        if (qtyDisplay) qtyDisplay.textContent = state.quickViewQty;
        if (submitBtn) {
          submitBtn.textContent = `Add to Bag • ${formatPrice(
            product.pricePKR * state.quickViewQty
          )}`;
        }
      }
    });

    qtyPlus?.addEventListener("click", () => {
      state.quickViewQty++;
      if (qtyDisplay) qtyDisplay.textContent = state.quickViewQty;
      if (submitBtn) {
        submitBtn.textContent = `Add to Bag • ${formatPrice(
          product.pricePKR * state.quickViewQty
        )}`;
      }
    });

    // Add to Bag submit
    submitBtn?.addEventListener("click", () => {
      addToCart(
        product.id,
        state.quickViewSelectedSize,
        state.quickViewSelectedColor,
        state.quickViewQty
      );
      closeQuickView();
    });

    // Size guide link trigger
    DOM.quickViewContainer
      .querySelector("#qv-size-guide-trigger")
      ?.addEventListener("click", () => {
        openSizeGuideModal();
      });
  }

  // --- Live Instant Search ---
  function renderSearchResults(query) {
    if (!DOM.searchResultsGrid) return;
    const q = query.trim().toLowerCase();

    let matches = window.PRODUCTS || [];
    if (q) {
      matches = matches.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (matches.length === 0) {
      DOM.searchResultsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--color-text-muted);">
          <p>No results found for "${query}". Try searching for "Silk", "Pleated", "380 GSM", or "Denim".</p>
        </div>
      `;
      return;
    }

    DOM.searchResultsGrid.innerHTML = matches
      .slice(0, 6)
      .map(
        (p) => `
        <div class="search-result-item" data-id="${p.id}">
          <div class="search-result-thumb">
            <img src="${p.image}" alt="${p.name}" />
          </div>
          <div class="search-result-info">
            <h4 class="search-result-title">${p.name}</h4>
            <div class="search-result-price">${formatPrice(p.pricePKR)}</div>
          </div>
        </div>
      `
      )
      .join("");

    DOM.searchResultsGrid.querySelectorAll(".search-result-item").forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-id");
        closeSearchModal();
        openQuickView(id);
      });
    });
  }

  function initSearch() {
    if (!DOM.searchInput) return;

    DOM.searchInput.addEventListener("input", (e) => {
      renderSearchResults(e.target.value);
    });

    DOM.searchChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const tag = chip.getAttribute("data-query") || chip.textContent.trim();
        DOM.searchInput.value = tag;
        renderSearchResults(tag);
      });
    });
  }

  // --- Mobile Navigation ---
  function initMobileNav() {
    if (!DOM.navToggleBtn || !DOM.mainNav) return;

    DOM.navToggleBtn.addEventListener("click", () => {
      DOM.navToggleBtn.classList.toggle("active");
      DOM.mainNav.classList.toggle("active");
      document.body.classList.toggle("modal-open");
    });

    DOM.mainNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        DOM.navToggleBtn.classList.remove("active");
        DOM.mainNav.classList.remove("active");
        document.body.classList.remove("modal-open");
      });
    });
  }

  // --- Global Keyboard & Backdrop Listeners ---
  function initGlobalListeners() {
    // ESC to close any modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCartDrawer();
        closeWishlistDrawer();
        closeQuickView();
        closeSearchModal();
        closeSizeGuideModal();
      }
    });

    // Cart Drawer Triggers
    document.querySelectorAll(".cart-trigger-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openCartDrawer();
      });
    });

    DOM.cartCloseBtn?.addEventListener("click", closeCartDrawer);
    DOM.cartDrawerBackdrop?.addEventListener("click", closeCartDrawer);

    // Wishlist Drawer Triggers
    document.querySelectorAll(".wishlist-trigger-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openWishlistDrawer();
      });
    });

    DOM.wishlistCloseBtn?.addEventListener("click", closeWishlistDrawer);
    DOM.wishlistDrawerBackdrop?.addEventListener("click", closeWishlistDrawer);

    // Search Triggers
    document.querySelectorAll(".search-trigger-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openSearchModal();
      });
    });

    DOM.searchModalCloseBtn?.addEventListener("click", closeSearchModal);
    DOM.searchModalBackdrop?.addEventListener("click", (e) => {
      if (e.target === DOM.searchModalBackdrop) {
        closeSearchModal();
      }
    });

    // Quick View Close
    DOM.quickViewCloseBtn?.addEventListener("click", closeQuickView);
    DOM.quickViewBackdrop?.addEventListener("click", (e) => {
      if (e.target === DOM.quickViewBackdrop) {
        closeQuickView();
      }
    });

    // Size Guide Close
    DOM.sizeGuideCloseBtn?.addEventListener("click", closeSizeGuideModal);
    DOM.sizeGuideBackdrop?.addEventListener("click", (e) => {
      if (e.target === DOM.sizeGuideBackdrop) {
        closeSizeGuideModal();
      }
    });

    // Promo Code Trigger
    DOM.cartPromoBtn?.addEventListener("click", applyPromoCode);
    DOM.cartPromoInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyPromoCode();
      }
    });

    // Checkout button demo action
    DOM.cartCheckoutBtn?.addEventListener("click", () => {
      showToast("Directing to Secure Karachi Checkout...", "check");
      setTimeout(() => {
        showToast("Demo Store Notice: Checkout is simulated for this frontend pitch demo.");
      }, 1200);
    });

    // Newsletter submit
    DOM.newsletterForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = DOM.newsletterInput?.value || "";
      if (email.includes("@")) {
        showToast("Welcome to the Unofficial Circle. Check your inbox for private access.");
        if (DOM.newsletterInput) DOM.newsletterInput.value = "";
      }
    });
  }

  // --- Window Exposure for Inlined HTML Handlers ---
  window.updateCartQty = updateCartQty;
  window.removeCartItem = removeCartItem;
  window.closeCartDrawer = closeCartDrawer;
  window.closeWishlistDrawer = closeWishlistDrawer;
  window.removeWishlistItem = toggleWishlist;
  window.moveWishlistToCart = function (productId) {
    const product = getProductById(productId);
    if (product) {
      addToCart(productId, product.sizes ? product.sizes[0] : "M");
      toggleWishlist(productId);
    }
  };
  window.openQuickView = openQuickView;
  window.openSizeGuide = openSizeGuideModal;

  // --- Hash Route / Deep Link Checker for Demos ---
  function checkHash() {
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    const scrollVal = parseInt(params.get("scroll") || "0", 10);
    if (scrollVal > 0) {
      window.scrollTo({ top: scrollVal, behavior: "instant" });
    }

    if (hash === "#demo-cart" || hash === "#cart") {
      setTimeout(openCartDrawer, 200);
    } else if (hash === "#demo-quickview" || hash === "#quickview") {
      setTimeout(() => openQuickView("uc-01"), 200);
    } else if (hash === "#demo-search" || hash === "#search") {
      setTimeout(openSearchModal, 200);
    } else if (hash === "#demo-wishlist" || hash === "#wishlist") {
      setTimeout(openWishlistDrawer, 200);
    } else if (hash === "#demo-sizeguide" || hash === "#sizeguide") {
      setTimeout(openSizeGuideModal, 200);
    }
  }

  // --- Initializer ---
  function init() {
    initAnnouncementTicker();
    initCurrencySwitcher();
    initFilters();
    initSearch();
    initMobileNav();
    initGlobalListeners();

    renderCategories();
    renderAllProducts();
    renderBestsellers();
    renderInstagramFeed();
    updateCartBadges();
    updateWishlistBadges();
    renderCart();

    if (window.observeNewElements) {
      window.observeNewElements();
    }

    checkHash();
    window.addEventListener("hashchange", checkHash);
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
