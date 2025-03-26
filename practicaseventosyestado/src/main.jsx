import { createRoot } from 'react-dom/client'
import { useState } from 'react'

const App = () => {
  const [contador, updateContador] = useState(0);

  const handleClick = (a) => {
    if(a.includes("right")){

      updateContador(prevContador => {
        return prevContador + 1
      }
    )}
    else {
      updateContador(prevContador => {
        return prevContador - 1
      }
    )}
  }

  const handleReset = () => {
    updateContador(0)
  }

  const esPar = contador % 2 === 0;
  const esParPalabra = esPar ? "Es par" : "Es impar"

  return (
    <>
    <h1>Contador: </h1>
    <h1>{contador}</h1>
    <p>{esParPalabra}</p>
    <button onClick={() => handleClick("right")}>Incrementar</button>
    <button onClick={handleReset}>Reset</button>
    <button onClick={() => handleClick("left")}>Decrementar</button>
    </>
  )
}

createRoot(document.getElementById('root')).render(
    <App />
)
