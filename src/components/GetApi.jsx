import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GetApi = () => {
  const [articulos, setArticulos] = useState([]);
  const [recuperado, setRecuperado] = useState(false);

  useEffect(() => {
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=50")
      .then((res) => res.json())
      .then((data) => {
        setArticulos(data);
        setRecuperado(true);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setRecuperado(true);
      });
  }, []);

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 1 } },
    },
    container: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.2 } },
    },
    item: {
      hidden: { opacity: 0, y: 0 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    },
  };

  if (!recuperado) return <div>Recuperando datos...</div>;

  return (
    <>
      <h1>Peticiones con el método fetch en ReactJS</h1>
      <motion.div
        variants={animations.container}
        initial="hidden"
        animate="show"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {articulos.map((articulo, index) => (
          <motion.div key={index} variants={animations.item}>
            <div>{articulo.character}</div>
            <motion.img
              src={articulo.image}
              alt={articulo.character}
              variants={animations.fadeIn}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default GetApi;

/**
 * npm install framer-motion
 * https://www.npmjs.com/package/framer-motion
 */
