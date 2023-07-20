import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";

const Checkout = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailconfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");

    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);

    /**Seecion funciones y validaciones */

    const manejadorFormulario = () => {
        event.preventDefault();


        //Verificamos que los campos esten completos:
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor completa los campos");
            return;
        }

        //Validmos que los emails coincidan
        if (email !== emailConfirmacion) {
            setError("Los campos del email no coinciden");
            return;
        }

        // Paso 1 - Creamos producto con datos de la orden de compra
        const orden = {
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        };


        //Modificamos el codigo para que ejecute varias promesas en paralelo (a la vez).
        //Por un lado, actualizar el stock de los productos
        //Por otro lado, que genere una orden de compra
        //Para hacer varias promesas en simultaneo usamos Promise.all()

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, "inventario", productoOrden.id);
                //Por cada producto en la colección inventario obtengo una referencia.
                //A partir de esa referencia obtengo el documento.
                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;
                //Data es un método que permite acceder a la informacion de documento.
                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad,
                })
                //Modifico el stock y subo la información actualizada.
            })
        )
            .then(() => {
                //Guardamos la orden en la base de datos
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        vaciarCarrito();
                    })
                    .catch((error) => {
                        console.log("Error al crear la orden", error);
                        setError("Error al crear la orden, vuelva a intenarlo");
                    })
            })
            .catch((error) => {
                console.log("No se puede actualizar el error");
                setError("No se puede actualizar el error, vuelva a intenarlo");
            })

        //Paso 2 - Guardar orden en la base de datos.
        addDoc(collection(db, "ordenes"), orden)
            .then(docRef => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch(error => {
                console.log("Error al generar la orden", error);
                setError("Error al generar la orden");
            })
    }

    return (
        <div>
            <h2> Checkout </h2>
            <form onSubmit={manejadorFormulario}>
                {
                    carrito.map(producto => (
                        <div key={producto.item.id}>
                            <p>{producto.item.nombre} x {producto.cantidad}</p>
                            <p>{producto.item.precio}</p>
                            <hr />
                        </div>
                    ))
                }
                <p> Cantidad Total : {cantidadTotal}</p>
                <hr />

                <div className="form-group">
                    <label htmlFor=""> Nombre </label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Apellido </label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono </label>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email Confirmacion</label>
                    <input type="email" value={emailConfirmacion} onChange={(e) => setEmailconfirmacion(e.target.value)} />
                </div>

                {
                    error && <p style={{ color: "red" }}> {error} </p>
                }

                <button type="Submit"> Finalizar Compra </button>
            </form>
            {
                ordenId && (
                    <strong> Gracias por tu compra. Tu NRO ORDEN  es {ordenId}</strong>
                )
            }
        </div>
    )
}

export default Checkout