import { useState, useEffect, useRef } from "react";

// El efecto que se observa en el video es un lazy loading con animación secuencial,
// lo que significa que los inmuebles aparecen progresivamente en lugar de todos al mismo tiempo.


const GetApi = () => {
  const [productos, setProductos] = useState([]);
  const [recuperado, setRecuperado] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setRecuperado(true);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setRecuperado(true);
      });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".producto");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.2}s`; // ⏳ Retraso secuencial
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    return () => items.forEach((item) => observer.unobserve(item));
  }, [productos]);

  if (!recuperado) return <div className="loader">Cargando productos...</div>;

  return (
    <>
      <h1>Lista de Productos</h1>
      <div ref={containerRef} className="productos-container">
        {productos.map((producto) => (
          <div key={producto.id} className="producto">
            <img src={producto.images[0]} alt={producto.title} />
            <p>{producto.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default GetApi;
