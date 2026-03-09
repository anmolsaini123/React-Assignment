import { useState, useEffect, } from 'react'
import './App.css'
import ProductCard from "./components/productCard";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("shop");
  const [paymentDone, setPaymentDone] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("Cart:", cart);
  };
  const total = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
  const generateQR = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Pay ${total}`;
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []);
  return (
    <div className="app">

      <h1 className="title">🛒 Smart Store</h1>

      <div className="top-bar">
        <p>Cart: {cart.length}</p>
        <p>Total: ${total.toFixed(2)}</p>
        {page === "shop" && (
          <button onClick={() => setPage("checkout")}>
            Checkout
          </button>
        )}
      </div>

      {page === "shop" && (
        <div className="products">
          {products.map(product => (
            <ProductCard
              key={product.id}
              data={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}

      {page === "checkout" && (
        <div className="checkout">
          <h2>Checkout</h2>
          <img src={generateQR()} alt="QR Code" />

          {!paymentDone && (
            <button onClick={() => setPaymentDone(true)}>
              I Have Paid
            </button>
          )}

          {paymentDone && (
            <h3 className="success">🎉 Payment Successful</h3>
          )}

          <button onClick={() => {
  setPage("shop");

  if (paymentDone) {
    setCart([]);  
  }

  setPaymentDone(false);
}}>
  Back to Shop
</button>
        </div>
      )}

    </div>
  );

}

export default App;
