import React, { useState } from "react";

// --- 1. MOCK DATA ---
const PRODUCTS = [
  { id: 1, name: "Super Laptop", price: 999, img: "https://placehold.co/150?text=Laptop" },
  { id: 2, name: "Smart Phone", price: 699, img: "https://placehold.co/150?text=Phone" },
  { id: 3, name: "Headphones", price: 199, img: "https://placehold.co/150?text=Audio" },
  { id: 4, name: "Mechanical Keyboard", price: 120, img: "https://placehold.co/150?text=Keyboard" },
  { id: 5, name: "Gaming Mouse", price: 80, img: "https://placehold.co/150?text=Mouse" },
  { id: 6, name: "4K Monitor", price: 300, img: "https://placehold.co/150?text=Screen" },
];

// --- 2. STYLES (Inline for single-file simplicity) ---
const styles = {
  container: { fontFamily: "Arial, sans-serif", maxWidth: "1000px", margin: "0 auto", padding: "20px" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#333", color: "white", borderRadius: "8px", marginBottom: "20px" },
  navBtn: { background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "1.2rem", marginLeft: "15px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ddd", padding: "15px", borderRadius: "8px", textAlign: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  img: { width: "100%", borderRadius: "5px", marginBottom: "10px" },
  btn: { backgroundColor: "#007bff", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", marginTop: "10px" },
  btnDanger: { backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", marginLeft: "5px" },
  cartItem: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", padding: "10px 0" },
  total: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "right", marginTop: "20px" }
};

// --- 3. MAIN COMPONENT ---
export default function App() {
  const [page, setPage] = useState("shop"); // 'shop' or 'cart'
  const [cart, setCart] = useState({}); // Object like { 1: 2, 3: 1 } (id: quantity)

  // -- Logic --
  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const id in cart) {
      const product = PRODUCTS.find((p) => p.id === Number(id));
      if (product) total += product.price * cart[id];
    }
    return total;
  };

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // -- Render Helpers --
  const renderShop = () => (
    <div>
      <h2>Products</h2>
      <div style={styles.grid}>
        {PRODUCTS.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.img} alt={product.name} style={styles.img} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button style={styles.btn} onClick={() => addToCart(product.id)}>
              Add to Cart {cart[product.id] > 0 && `(${cart[product.id]})`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCart = () => (
    <div>
      <h2>Your Shopping Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {Object.keys(cart).map((id) => {
            const product = PRODUCTS.find((p) => p.id === Number(id));
            const quantity = cart[id];
            return (
              <div key={id} style={styles.cartItem}>
                <div>
                  <strong>{product.name}</strong> x {quantity}
                </div>
                <div>
                  <span>${product.price * quantity}</span>
                  <button 
                    style={{...styles.btnDanger, marginLeft: "15px"}} 
                    onClick={() => removeFromCart(id)}
                  >
                    -
                  </button>
                  <button 
                    style={{...styles.btn, marginLeft: "5px", backgroundColor: "#28a745"}} 
                    onClick={() => addToCart(id)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <div style={styles.total}>Total: ${getTotalAmount()}</div>
          <div style={{textAlign: 'right', marginTop: '10px'}}>
             <button style={styles.btn} onClick={() => alert("Checkout not implemented!")}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <h1 style={{margin:0}}>SimpleShop</h1>
        <div>
          <button style={styles.navBtn} onClick={() => setPage("shop")}>Shop</button>
          <button style={styles.navBtn} onClick={() => setPage("cart")}>
            Cart 🛒 ({cartItemCount})
          </button>
        </div>
      </nav>

      {/* Page Content */}
      {page === "shop" ? renderShop() : renderCart()}
    </div>
  );
}
