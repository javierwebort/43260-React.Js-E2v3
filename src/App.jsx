//import TituloPrincipal from './componentes/TituloPrincipal/TituloPrincipal'
//import ItemCount from './componentes/ItemCount/ItemCount'
import NavBar from './componentes/NavBar/NavBar'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'

const App = () => {

  return (
    <>
    <NavBar/>
    <ItemListContainer greeting={"Welcome to Go Market"}/>
    
    {/* <ItemCount/> */}
    {/* Lo vimos en clase pero no se necesita para la primera entrega.
        por eso se comenta */}

    </>
  )
}

export default App
