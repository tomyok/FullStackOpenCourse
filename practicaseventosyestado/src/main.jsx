import { createRoot } from 'react-dom/client'
import { useState } from 'react'

const App = () => {
  const [contador, updateContador] = useState(0);



  return (
    <>
    <h1>Contador: </h1>
    <h1>{contador}</h1>
    <button onClick={() => {
      //updateContador(contador + 1)
      updateContador(prevContador => {
        return prevContador + 1
      })
    }}>Incrementar</button>
    </>
  )
}

createRoot(document.getElementById('root')).render(
    <App />
)
