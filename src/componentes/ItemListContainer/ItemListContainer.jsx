import { useState, useEffect } from "react";
import { getProductos } from "../../asyncmock";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = (props) => {
    const [productos, setProductos] = useState([]);

    useEffect( () => {
        getProductos()
            .then(respuesta => setProductos(respuesta))
            .catch(error => console.log(error))

    }, [])
    return (
        <>
        <h2> {props.greeting} </h2>
        <ItemList productos={productos} />
        </>
    )
}

export default ItemListContainer