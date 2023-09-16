import logo from './logo.svg';
import './App.css';
import Tablero from './components/Tablero';
import { useEffect, useState } from 'react';
import { tab } from '@testing-library/user-event/dist/tab';

function App() {
  const [tablero, setTablero] = useState([]);
  const [coloresPiezas, setColoresPiezas] = useState([]);
  const [jugando, setJugando] = useState(true);
  const altura = 20;
  const anchura = 10;
  const colores = ["yellow", "purple", "orange", "red"]
  let idInterval;
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
      const tableroColoresAux = [];
      for (let i = 0; i < altura; i++) {
        const filaAux = Array(anchura).fill(null);
        const filaAuxColores = Array(anchura).fill("fondo"); // Llena la fila con valores nulos
        tableroAux.push(filaAux);
        tableroColoresAux.push(filaAuxColores)
      }

      setTablero(tableroAux);
      setColoresPiezas(tableroColoresAux)
    };

    inicializarTablero();
  }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente
  function siguientePieza() {
    return Math.floor(Math.random() * piezasDisponibles.length); // Genera un número entre 0 (inclusive) y 4 (exclusivo)

  }

  function generarPieza(pieza) {
    if (jugando) {
      let anchuraPieza = calcularAnchura(pieza);
      console.log("Pieza n " + pieza);
      let inicio = anchura - anchuraPieza;
      if (inicio % 2 == 0) {
        inicio = inicio / 2;
      } else {
        inicio = (inicio + 1) / 2
      }

      console.log(inicio);
      colocarPieza(pieza, inicio);
    }
  }

  function calcularAnchura(pieza) {
    const filas = piezasDisponibles[pieza][0].length;
    const columnas = piezasDisponibles[pieza].length;
    const bloque = piezasDisponibles[pieza]
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
    let tableroAux = [...tablero]
    let tableroAuxColores = [...coloresPiezas]

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        let col = j + inicio;
        tableroAux[i][col] = bloque[i][j];
        if (bloque[i][j] == 0) {
          tableroAuxColores[i][col] = "purple";

        }
      }
    }

    // Actualiza el estado con la nueva copia del tablero
    setTablero(tableroAux);
    setColoresPiezas(tableroAuxColores)
  }
  function moverPiezas() {
    let tableroAux = [...tablero]
    let coloresAux = [...coloresPiezas]
    let controlAltura = false;
    if (!colisionVertical(tableroAux)) {
      for (let i = (altura - 1); i > 0; i--) {
        for (let j = 0; j < anchura; j++) {
          //if (!colisionVertical(i, j, tableroAux)) {
          if (tableroAux[i][j] == null && tableroAux[(i - 1)][j] == 0) {
            tableroAux[i][j] = 0;
            tableroAux[(i - 1)][j] = null;
            coloresAux[i][j] = coloresAux[(i - 1)][j];
            coloresAux[(i - 1)][j] = "fondo";
          }
          //controlAltura=colisionVertical(i, j, tableroAux)

          /*} else {
            controlAltura = true;
            console.log("Parando");
            pararPiezas();
            generarPieza(siguientePieza())
  
            break;
          }*/
        }
      }
    }else{
      console.log("Parando");
            pararPiezas();
            generarPieza(siguientePieza())
    }

    if (!controlAltura) {
      console.log(("actualizo"));
      setTablero(tableroAux)
      setColoresPiezas(coloresAux)
    }

  }
  function pararPiezas() {
    let tableroAux = [...tablero]

    for (let i = (altura - 1); i > 0; i--) {
      for (let j = 0; j < anchura; j++) {

        if ((tableroAux[i][j] == 0)) {
          tableroAux[i][j] = 1
        }

      }
    }
    setTablero(tableroAux)
  }
  function colisionVertical(array) {

    for (let i = (altura - 1); i > 0; i--) {
      for (let j = 0; j < anchura; j++) {
        if (i == (altura - 1) && array[i][j] == 0) {
          console.log("choco con abajo" + i + " " + j);
          console.log(...array);
          return true;
        }
    
        if (array[i - 1][j] == 1 && array[(i - 2)][j] == 0) {
          console.log("choco con bloque");
          console.log(...array);
    
    
          return true;
        }
      }
    }
   



    return false;
  }

  function juegoEnMarcha() {
    generarPieza(1);

    // Usamos una función anónima dentro de setTimeout para evitar la llamada inmediata
    // Usamos setInterval para llamar a moverPiezas cada 2000 milisegundos (2 segundos)
    idInterval = setInterval(moverPiezas, 500);
  }


  return (
    <>
      <Tablero tablero={tablero} setTablero={setTablero} generarPieza={generarPieza} coloresPiezas={coloresPiezas} setColoresPiezas={setColoresPiezas}></Tablero>
      <button onClick={() => juegoEnMarcha()}>Empezar</button><button onClick={() => moverPiezas()}>seguir</button>
    </>);
}

export default App;
