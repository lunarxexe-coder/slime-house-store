import { useState } from 'react';
import './App.css';

type Category = 'All' | 'Women' | 'Men' | 'Accessories';

type Product = {
  id: number;
  name: string;
  price: number;
  category: Exclude<Category, 'All'>;
  description: string;
  sizes: string[];
  image?: string;
};

type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Cathedral Crop',
    price: 35000,
    category: 'Women',
    description: 'A signature SLIME HOUSE cropped streetwear piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image:
      'https://i.ibb.co/r2KYvnkX/Neon-Claw-Cropped-Athletic-Top-Showcase.png',
  },
  {
    id: 2,
    name: 'Bum Shorts',
    price: 28000,
    category: 'Women',
    description: 'Statement shorts with an underground streetwear fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://i.ibb.co/skBN5fd/Neon-Claw-Athletic-Shorts-Showcase.png',
  },
  {
    id: 3,
    name: 'Graphic Beanie',
    price: 22000,
    category: 'Accessories',
    description: 'A graphic SLIME HOUSE beanie.',
    sizes: ['ONE SIZE'],
    image:
      'https://i.ibb.co/hFJxByyc/Slime-House-Graphic-Beanie-Collection.png',
  },
  {
    id: 4,
    name: 'SLIME HOUSE Polo',
    price: 45000,
    category: 'Men',
    description: 'Signature SLIME HOUSE polo with underground detailing.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://i.ibb.co/0RmcmKRK/Slime-House-Polo-Shirt-Showcase.png',
  },
  {
    id: 5,
    name: 'Neon Denim',
    price: 65000,
    category: 'Men',
    description: 'Statement denim designed for the SLIME HOUSE aesthetic.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://i.ibb.co/rK61P8WG/Slime-House-Neon-Denim-Display.png',
  },
  {
    id: 6,
    name: 'Purple Camo Shorts',
    price: 30000,
    category: 'Women',
    description: 'Purple camo athletic shorts with a bold streetwear fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image:
      'https://i.ibb.co/XZqnTSkq/Purple-Camo-Athletic-Shorts-Front-and-Back.png',
  },
  {
    id: 7,
    name: 'Purple Leopard Wide Leg Pants',
    price: 58000,
    category: 'Women',
    description: 'Wide-leg statement pants with a leopard finish.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://i.ibb.co/3yppjwKF/Purple-Leopard-Wide-Leg-Pants-Mockup.png',
  },
  {
    id: 8,
    name: 'Black Neon Camo Shorts',
    price: 30000,
    category: 'Men',
    description: 'Black and neon-green camo shorts built for the street.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://i.ibb.co/0pKSdHG1/Black-Neon-Green-Camo-Shorts-Mockup.png',
  },
  {
    id: 9,
    name: 'Slime Angel Jersey',
    price: 55000,
    category: 'Men',
    description: 'Statement jersey inspired by underground football culture.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://i.ibb.co/5hm1nWr7/image-gen-1-20260815-070700.png',
  },
  {
    id: 10,
    name: 'Leopard Athletic Set',
    price: 60000,
    category: 'Women',
    description: 'Performance-inspired SLIME HOUSE leopard athletic set.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://i.ibb.co/hFXrDRcB/Neon-Leopard-Athletic-Set.png',
  },
  {
    id: 11,
    name: 'SLIME HOUSE Tracksuit',
    price: 95000,
    category: 'Men',
    description: 'Premium oversized SLIME HOUSE tracksuit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image:
      'https://i.ibb.co/mVh1chmw/Futuristic-Black-and-Neon-Tracksuit-Lookbook.png',
  },
  {
    id: 12,
    name: 'Leopard Wide Leg Pants',
    price: 58000,
    category: 'Women',
    description: 'Bold wide-leg pants with a statement leopard finish.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image:
      'https://i.ibb.co/9kYWD0kQ/Leopard-Print-Wide-Leg-Pants-Showcase.png',
  },
  {
    id: 13,
    name: 'Crossbody Bag',
    price: 32000,
    category: 'Accessories',
    description: 'Compact SLIME HOUSE streetwear crossbody bag.',
    sizes: ['ONE SIZE'],
    image:
      'https://i.ibb.co/bn8Gdq2/Chat-GPT-Image-Aug-17-2026-12-45-19-AM.png',
  },
  {
    id: 14,
    name: 'Slime House Socks',
    price: 15000,
    category: 'Accessories',
    description: 'Statement SLIME HOUSE socks.',
    sizes: ['ONE SIZE'],
  },
  {
    id: 15,
    name: 'Slime House Neck Piece',
    price: 18000,
    category: 'Accessories',
    description: 'Minimal SLIME HOUSE neck accessory.',
    sizes: ['ONE SIZE'],
    image: 'https://i.ibb.co/mCtw7qFQ/ae6668ac-86db-4836-8ea3-38935b7d25e0.png',
  },
];

const categories: Category[] = ['All', 'Women', 'Men', 'Accessories'];

function money(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function App() {
  const [category, setCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    state: '',
    city: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Paystack');

  const visibleProducts =
    category === 'All'
      ? products
      : products.filter((product) => product.category === category);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
  }

  function addToCart() {
    if (!selectedProduct || !selectedSize) return;

    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.product.id === selectedProduct.id && item.size === selectedSize
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === selectedProduct.id && item.size === selectedSize
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...current,
        {
          product: selectedProduct,
          size: selectedSize,
          quantity,
        },
      ];
    });

    setSelectedProduct(null);
    setCartOpen(true);
  }

  function changeQuantity(id: number, size: string, amount: number) {
    setCart((current) =>
      current.map((item) =>
        item.product.id === id && item.size === size
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  }

  function removeItem(id: number, size: string) {
    setCart((current) =>
      current.filter((item) => !(item.product.id === id && item.size === size))
    );
  }

  function updateCustomer(field: keyof typeof customer, value: string) {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function validateCheckout() {
    if (!customer.name.trim()) {
      alert('Please enter your full name.');
      return false;
    }

    if (!customer.email.trim() || !customer.email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (!customer.phone.trim()) {
      alert('Please enter your phone number.');
      return false;
    }

    if (!customer.state.trim()) {
      alert('Please enter your state.');
      return false;
    }

    if (!customer.city.trim()) {
      alert('Please enter your city.');
      return false;
    }

    if (!customer.address.trim()) {
      alert('Please enter your delivery address.');
      return false;
    }

    return true;
  }
  return (
    <div className="site">
      <nav className="navbar">
        <a className="logo" href="#">
          SLIME HOUSE
        </a>

        <div className="nav-links">
          <a href="#shop">SHOP</a>
          <a href="#women">WOMEN</a>
          <a href="#men">MEN</a>
          <a href="#accessories">ACCESSORIES</a>
        </div>

        <button className="cart-button" onClick={() => setCartOpen(true)}>
          CART ({cartCount})
        </button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">SLIME HOUSE / DROP 01</p>

            <h1>
              MOVE
              <br />
              <span>DIFFERENT.</span>
            </h1>

            <p className="hero-copy">
              Nigerian underground streetwear.
              <br />
              Built for those who move differently.
            </p>

            <a className="shop-button" href="#shop">
              SHOP THE DROP →
            </a>
          </div>

          <div className="hero-visual">
            <div className="hero-brand">
              <img
                src="https://i.ibb.co/5WNP3nSC/Chat-GPT-Image-Aug-17-2026-09-54-44-AM.png"
                alt="SLIME HOUSE Claw"
                className="hero-claw"
              />

              <div className="hero-brand-text">
                <span>SLIME</span>
                <span>HOUSE</span>
              </div>
            </div>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-top">
            <div>
              <p className="section-label">01 / THE DROP</p>
              <h2>NEW ARRIVALS</h2>
            </div>

            <span className="product-count">
              {visibleProducts.length} PRODUCTS
            </span>
          </div>

          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'filter active' : 'filter'}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
                onClick={() => openProduct(product)}
              >
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="placeholder-product">
                      <span>SLIME</span>
                      <span>HOUSE</span>
                    </div>
                  )}

                  <small>{product.category}</small>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{money(product.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="collections" id="women">
          <div className="collection women">
            <span>01</span>
            <h2>WOMEN</h2>

            <button
              onClick={() => {
                setCategory('Women');
                document.getElementById('shop')?.scrollIntoView();
              }}
            >
              SHOP WOMEN →
            </button>
          </div>

          <div className="collection men" id="men">
            <span>02</span>
            <h2>MEN</h2>

            <button
              onClick={() => {
                setCategory('Men');
                document.getElementById('shop')?.scrollIntoView();
              }}
            >
              SHOP MEN →
            </button>
          </div>

          <div className="collection accessories" id="accessories">
            <span>03</span>
            <h2>ACCESSORIES</h2>

            <button
              onClick={() => {
                setCategory('Accessories');
                document.getElementById('shop')?.scrollIntoView();
              }}
            >
              SHOP ACCESSORIES →
            </button>
          </div>
        </section>

        <section className="statement">
          <p>SLIME HOUSE</p>

          <h2>BUILT DIFFERENT.</h2>

          <span>
            A Lagos-born underground fashion label.
            <br />
            No rules. No limits. Just movement.
          </span>
        </section>

        <section className="newsletter">
          <p>STAY IN THE LOOP</p>

          <h2>
            THE NEXT DROP
            <br />
            STARTS HERE.
          </h2>

          <div className="newsletter-form">
            <input type="email" placeholder="YOUR EMAIL ADDRESS" />

            <button onClick={() => alert('Thanks for joining SLIME HOUSE.')}>
              JOIN →
            </button>
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div className="modal-backdrop">
          <div className="product-modal">
            <button
              className="close-button"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div className="modal-image">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              ) : (
                <div className="modal-placeholder">SLIME HOUSE</div>
              )}
            </div>

            <div className="modal-details">
              <p className="modal-label">SLIME HOUSE / DROP 01</p>

              <h2>{selectedProduct.name}</h2>

              <strong className="modal-price">
                {money(selectedProduct.price)}
              </strong>

              <p className="modal-description">{selectedProduct.description}</p>

              <p className="option-label">SIZE</p>

              <div className="sizes">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={selectedSize === size ? 'size active' : 'size'}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <p className="option-label">QUANTITY</p>

              <div className="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="add-button" onClick={addToCart}>
                ADD TO CART →
              </button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>YOUR CART</h2>

              <button onClick={() => setCartOpen(false)}>×</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>YOUR CART IS EMPTY.</p>

                <button onClick={() => setCartOpen(false)}>
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={`${item.product.id}-${item.size}`}
                    >
                      <div className="cart-item-image">
                        {item.product.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        ) : (
                          <span>SLIME</span>
                        )}
                      </div>

                      <div className="cart-item-info">
                        <h3>{item.product.name}</h3>

                        <p>Size: {item.size}</p>

                        <p>{money(item.product.price)}</p>

                        <div className="cart-controls">
                          <button
                            onClick={() =>
                              changeQuantity(item.product.id, item.size, -1)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              changeQuantity(item.product.id, item.size, 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove-button"
                          onClick={() => removeItem(item.product.id, item.size)}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>TOTAL</span>
                    <strong>{money(cartTotal)}</strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                  >
                    CHECKOUT →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="checkout-screen">
          <div className="checkout-container">
            <button
              className="back-to-store"
              onClick={() => setCheckoutOpen(false)}
            >
              ← BACK TO STORE
            </button>

            <div className="checkout-title">
              <p>SLIME HOUSE / CHECKOUT</p>
              <h1>CHECKOUT</h1>
            </div>

            <div className="checkout-layout">
              <div className="checkout-form">
                <section>
                  <p className="checkout-label">01 / CUSTOMER</p>
                  <h2>YOUR DETAILS</h2>

                  <input
                    type="text"
                    placeholder="Full name"
                    value={customer.name}
                    onChange={(e) => updateCustomer('name', e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="Email address"
                    value={customer.email}
                    onChange={(e) => updateCustomer('email', e.target.value)}
                  />

                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={customer.phone}
                    onChange={(e) => updateCustomer('phone', e.target.value)}
                  />
                </section>

                <section>
                  <p className="checkout-label">02 / DELIVERY</p>
                  <h2>SHIPPING ADDRESS</h2>

                  <select
                    value={customer.country}
                    onChange={(e) => updateCustomer('country', e.target.value)}
                  >
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>

                  <input
                    type="text"
                    placeholder="State"
                    value={customer.state}
                    onChange={(e) => updateCustomer('state', e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="City"
                    value={customer.city}
                    onChange={(e) => updateCustomer('city', e.target.value)}
                  />

                  <textarea
                    placeholder="Delivery address"
                    value={customer.address}
                    onChange={(e) => updateCustomer('address', e.target.value)}
                  />
                </section>

                <section>
                  <p className="checkout-label">03 / PAYMENT</p>
                  <h2>PAYMENT METHOD</h2>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Paystack'}
                      onChange={() => setPaymentMethod('Paystack')}
                    />
                    PAYSTACK
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Flutterwave'}
                      onChange={() => setPaymentMethod('Flutterwave')}
                    />
                    FLUTTERWAVE
                  </label>

                  <p className="payment-note">
                    Payment processing will be connected securely before launch.
                  </p>
                </section>
              </div>

              <aside className="checkout-summary">
                <p className="checkout-label">ORDER SUMMARY</p>
                <h2>YOUR ORDER</h2>

                {cart.map((item) => (
                  <div
                    className="checkout-item"
                    key={`${item.product.id}-${item.size}`}
                  >
                    <div>
                      <strong>{item.product.name}</strong>

                      <span>
                        Size {item.size} × {item.quantity}
                      </span>
                    </div>

                    <strong>{money(item.product.price * item.quantity)}</strong>
                  </div>
                ))}

                <div className="checkout-total-line">
                  <span>SUBTOTAL</span>
                  <span>{money(cartTotal)}</span>
                </div>

                <div className="checkout-total-line">
                  <span>DELIVERY</span>
                  <span>CALCULATED</span>
                </div>

                <div className="checkout-grand-total">
                  <span>TOTAL</span>
                  <strong>{money(cartTotal)}</strong>
                </div>

                <button
                  className="place-order"
                  onClick={() => {
                    if (!validateCheckout()) return;

                    alert(
                      `Order details confirmed. Payment method: ${paymentMethod}.`
                    );
                  }}
                >
                  PLACE ORDER →
                </button>
              </aside>
            </div>
          </div>
        </div>
      )}

      <footer>
        <span>SLIME HOUSE © 2026</span>
        <span>MADE IN LAGOS, NIGERIA</span>
      </footer>
    </div>
  );
}

export default App;
