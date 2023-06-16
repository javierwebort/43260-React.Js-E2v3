import React from 'react'

const ItemDetail = ({id, nombre, precio, img}) => {
  return (
    <div>
        <h2>Nombre: {nombre}</h2>
        <h3>Precio: {precio}</h3>
        <h3>ID: {id}</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo esse fugit magni quibusdam adipisci dolorum eius debitis cumque incidunt, impedit consectetur nesciunt ducimus repudiandae quo quidem ipsa nihil ipsam totam?</p>
        <img src={img} alt={nombre}/>
    </div>
  )
}

export default ItemDetail