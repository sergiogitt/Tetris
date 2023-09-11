import logo from './logo.svg';
import './App.css';
import Tablero from './components/Tablero';
import { useEffect, useState } from 'react';
import { tab } from '@testing-library/user-event/dist/tab';

function App() {
  const [tablero, setTablero] = useState([]);
  const [jugando, setJugando] = useState(true);
  const altura = 20;
  const anchura = 10;
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
  useEffect(() => {
    // Función para inicializar el tablero
    const inicializarTablero = () => {
      const tableroAux = [];
      for (let i = 0; i < altura; i++) {
        const filaAux = Array(anchura).fill(null); // Llena la fila con valores nulos
        tableroAux.push(filaAux);
      }
      setTablero(tableroAux);
    };

    inicializarTablero();
  }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente
  let render=<Tablero></Tablero>
  function siguientePieza() {
    return Math.floor(Math.random() * piezasDisponibles.length); // Genera un número entre 0 (inclusive) y 4 (exclusivo)

  }
  
  function generarPieza(pieza, fila, columna) {
    if (jugando) {
      let anchuraPieza = calcularAnchura(pieza);
      console.log(anchura);
      let inicio=(anchura-anchuraPieza)/2;
      console.log(inicio);
      colocarPieza(pieza,inicio);
    }
  }
  
  function calcularAnchura(pieza) {
    const filas = piezasDisponibles[pieza][0].length;
    const columnas = piezasDisponibles[pieza].length;
    const bloque=piezasDisponibles[pieza]
    let anchuraMaxima = 0;
    
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (bloque[j][i] === 0) {
                anchuraMaxima++;
                break;
            } 
        }
    }
    return anchuraMaxima;
  }
  
  function colocarPieza(pieza, inicio) {
  const filas = piezasDisponibles[pieza][0].length;
  const columnas = piezasDisponibles[pieza].length;
  const bloque = piezasDisponibles[pieza];

  // Crea una nueva copia del tablero antes de realizar modificaciones
  const tableroAux = [...tablero].map((fila) => [...fila]);

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let col = j + inicio;
      tableroAux[i][col] = bloque[i][j];
    }
  }

  // Actualiza el estado con la nueva copia del tablero
  setTablero(tableroAux);
}

  function juegoEnMarcha() {

  }

  return (
    <>
    <Tablero tablero={tablero} setTablero={setTablero} generarPieza={generarPieza}></Tablero>
    <button onClick={()=>generarPieza(0,0)}>Empezar</button>
    </>);
}

export default App;
