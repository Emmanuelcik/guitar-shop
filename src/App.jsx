import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import guitars from "./data";

const App = () => {
  const intialCarState = () => {
    const localStorageContent = localStorage.getItem("cart");
    return localStorageContent ? JSON.parse(localStorageContent) : [];
  };
  const [data, setData] = useState(() => guitars);

  const [cart, setCart] = useState(intialCarState);

  const NAX_LIMIT_ITEMS = 10;
  const MIN_LIMIT_ITEMS = 1;

  useEffect(() => {
    saveDataToLocalStorage();
  }, [cart]);

  const addToCart = (item) => {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart((prev) => [...prev, item]);
    }
  };

  const deleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar?.id !== id));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < NAX_LIMIT_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    saveDataToLocalStorage();
  };
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_LIMIT_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    saveDataToLocalStorage();
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveDataToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data &&
            data.length > 0 &&
            data.map((guitar) => (
              <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
            ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
