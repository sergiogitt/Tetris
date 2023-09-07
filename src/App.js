import logo from './logo.svg';
import './App.css';
import Tablero from './components/Tablero';
import { useState } from 'react';
import { tab } from '@testing-library/user-event/dist/tab';

function App() {
  const [tablero, setTablero] = useState([]);
  const [jugando, setJugando] = useState(true);
  const piezasDisponibles = [
    [
      [0, 0],
      [0, 0]
    ],
    [
      [null, 0, null],
      [0, 0, null],
      [null, 0, null]
    ],
    [
      [0, null, null],
      [0, null, null],
      [0, 0, null]
    ],
    [
      [null, 0, 0],
      [0, 0, null],
      [null, null, null]
    ]
  ]
  let render=<Tablero></Tablero>
  function siguientePieza() {
    return Math.floor(Math.random() * piezasDisponibles.length); // Genera un número entre 0 (inclusive) y 4 (exclusivo)

  }
  function generarPieza(pieza, fila, columna) {
    if (jugando) {
      let anchura = calcularAnchura(pieza);
      let inicio=(tablero.length-anchura)/2
    }
  }
  
  function calcularAnchura(pieza) {
    const filas = piezasDisponibles[pieza][0].length;
    const columnas = piezasDisponibles[pieza].length;
    const bloque=piezasDisponibles[pieza]
    

    let anchuraMaxima = 0;
    let anchuraActual = 0;

    let maximoAnchura = 0;

    for (let columna = 0; columna < columnas; columna++) {
        let anchuraActual = 0;

        for (let fila = 0; fila < filas; fila++) {
            if (bloque[fila][columna] === 0) {
                anchuraActual++;
            } else {
                if (anchuraActual > maximoAnchura) {
                    maximoAnchura = anchuraActual;
                }
                anchuraActual = 0;
            }
        }

        if (anchuraActual > maximoAnchura) {
            maximoAnchura = anchuraActual;
        }
    }

    
    console.log(anchuraMaxima);
    return maximoAnchura;
 
   
  }
  calcularAnchura(3)
  function colocarPieza() {

  }
  function juegoEnMarcha() {

  }
  return (
    <Tablero tablero={tablero} setTablero={setTablero} generarPieza={generarPieza}></Tablero>);
}

export default App;
