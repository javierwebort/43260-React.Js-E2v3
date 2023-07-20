import { useState, useEffect } from "react";
//import { getProductos, getProductosPorCategoria } from "../../asyncmock";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

/**Importamos nuevas funciones: */
import { collection, getDocs, where, query } from "firebase/firestore";

// Collection para se usa para vincular una coleccion de Firestore (por ejemplo "Inventario")
// GetDocs trae todos los elementos de una colección
// Query hace consultas a la base de datos
// Where filra las consultas

import { db } from "../../services/config";

const ItemListContainer = (props) => {
    const [productos, setProductos] = useState([]);

    const { idCategoria } = useParams();
    useEffect(() => {
        const misProdctos = idCategoria ? query(collection(db, "inventario"), where("idCat", "==", idCategoria)) : collection(db, "inventario");
        getDocs(misProdctos)
            .then(res => {
                const nuevosProdictos = res.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setProductos(nuevosProdictos);
            })
            .catch(error => console.log(error));
    }, [])

    /**
        useEffect(() => {
            const funcion = idCategoria ? getProductosPorCategoria : getProductos;
            funcion(idCategoria)
                .then(respuesta => setProductos(respuesta))
                //.catch(error => console.log(error))
        }, [idCategoria])
    
         */

    return (
        <>
            <h2> {props.greeting} </h2>
            <ItemList productos={productos} />
        </>
    )
}

export default ItemListContainer