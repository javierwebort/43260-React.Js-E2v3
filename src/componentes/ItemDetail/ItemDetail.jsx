//import React from 'react'
import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";

// 1) Importemos
import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";


const ItemDetail = ({ id, nombre, stock, precio, img }) => {
  // Estado para la cantidad de productos agregados.
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  //Use Context
  const {agregarProducto} = useContext (CarritoContext);

  // Funcion para manejar la cantidad
  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    //console.log("Productos agregados: " + cantidad);
    // Creo objeto con el item y la cantidad

    const item = {id, nombre, precio};
    agregarProducto(item, cantidad)

  }

  return (
    <div>
      <h2>Nombre: {nombre}</h2>
      <h3>Precio: {precio}</h3>
      <h3>ID: {id}</h3>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo esse fugit magni quibusdam adipisci dolorum eius debitis cumque incidunt, impedit consectetur nesciunt ducimus repudiandae quo quidem ipsa nihil ipsam totam?</p>
      <img src={img} alt={nombre} />

      {/* logica para montaje y desmontaje de componentes.*/}

      {agregarCantidad > 0 ? (<Link to="/cart"> Terminar Compra </Link>) :
        (<ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)

      }


    </div>
  )
}

export default ItemDetail