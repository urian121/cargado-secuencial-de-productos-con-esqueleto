import  { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GetApi = () => {
  const [productos, setProductos] = useState([]);
  const [loadingProgreso, setLoadingProgreso] = useState(Array(6).fill(false));
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulated delay of 5 seconds before starting to fetch data
    const timer = setTimeout(() => {
      fetch("https://api.escuelajs.co/api/v1/products")
        .then((res) => res.json())
        .then((data) => {
          // Simulate progressive loading of each product
          data.slice(0, 10).forEach((producto, index) => {
            setTimeout(() => {
              setProductos((prev) => {
                const newProductos = [...prev];
                newProductos[index] = producto;
                return newProductos;
              });
              setLoadingProgreso((prev) => {
                const newProgreso = [...prev];
                newProgreso[index] = true;
                return newProgreso;
              });
            }, (index + 1) * 200); // 200ms delay for each product
          });
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }, 1000); // 1 seconds initial delay

    return () => clearTimeout(timer);
  }, []);

  // Skeleton array to match the number of products
  const skeletons = Array(10).fill(0);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Lista de Productos</h1>
      <div ref={containerRef} className="productos-container">
        {skeletons.map((_, index) => (
          <div key={index} className="producto">
            {!loadingProgreso[index] ? (
              // Skeleton loader
              <>
                <Skeleton height={200} width={200} />
                <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
              </>
            ) : (
              // Loaded product
              productos[index] && (
                <>
                  <img
                    src={productos[index].images[0]}
                    alt={productos[index].title}
                    style={{
                      animation: "fadeIn 0.1s ease-out",
                      opacity: 0,
                      animationFillMode: "forwards",
                    }}
                  />
                  <p>{productos[index].title}</p>
                </>
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default GetApi;
