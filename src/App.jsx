import { useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import guitars from "./data";

const App = () => {
  const [data, setData] = useState(() => guitars);

  const [car, setCar] = useState([]);

  const addToCart = (item) => {
    const itemExists = car.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      const updatedCart = [...car];
      updatedCart[itemExists].quantity++;
      setCar(updatedCart);
    } else {
      item.quantity = 1;
      setCar((prev) => [...prev, item]);
    }
  };

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data &&
            data.length > 0 &&
            data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
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
