import logo from './logo.svg';
import './App.css';
import Tablero from './components/Tablero';
import { useEffect, useState } from 'react';
import { tab } from '@testing-library/user-event/dist/tab';
import Pieza from './components/Pieza';

function App() {
  const [tablero, setTablero] = useState([]);
  const [coloresPiezas, setColoresPiezas] = useState([]);
  const [jugando, setJugando] = useState(true);
  const [piezaActual, setPiezaActual] = useState(null);
  const [piezaSiguiente, setPiezaSiguiente] = useState(null);

  const altura = 20;
  const anchura = 10;
  const colores = ["square", "t", "l", "z", "I"]
  let idInterval;
  const piezasDisponibles = [


    [

      [0, 0, 0, 0],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],
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
      [null, 0, null],
      [null, 0, null],
      [null, 0, 0]
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
      setColoresPiezas(tableroColoresAux);
    };
    inicializarTablero();
  }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente

  function siguientePieza() {
    return Math.floor(Math.random() * piezasDisponibles.length); // Genera un número entre 0 (inclusive) y 4 (exclusivo)

  }
  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        document.getElementById("moverIzq").click()
      }
      if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        document.getElementById("moverDer").click()
      }
      if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        document.getElementById("girar").click()
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function generarPieza() {
  if (jugando) {
    let numeroPiezaActual;
    let numeroPiezaSiguiente;
    if (piezaActual === null) {
      console.log("genero nuevo");
      numeroPiezaActual = siguientePieza();
      setPiezaActual(numeroPiezaActual);
    } else {
      setPiezaActual(piezaSiguiente); // Cambia piezaSiguiente a numeroPiezaSiguiente
    }
    console.log("actual " + numeroPiezaActual);

    numeroPiezaSiguiente = siguientePieza();
    console.log("siguiente " + numeroPiezaSiguiente);
    setPiezaSiguiente(numeroPiezaSiguiente);

    let anchuraPieza = calcularAnchura(numeroPiezaActual);
    let inicio = anchura - anchuraPieza;
    if (inicio % 2 === 0) {
      inicio = inicio / 2;
    } else {
      inicio = (inicio + 1) / 2;
    }
    colocarPieza(numeroPiezaActual, inicio);
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
    if (!colisionVertical(tableroAux)) {
      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
          let col = j + inicio;
          tableroAux[i][col] = bloque[i][j];
          if (bloque[i][j] == 0) {
            tableroAuxColores[i][col] = colores[pieza]

          }
        }
      }
    } else {
      setJugando(false)
      clearInterval(idInterval)
    }

    if (jugando) {
      setTablero(tableroAux);
      setColoresPiezas(tableroAuxColores)
    }

    // Actualiza el estado con la nueva copia del tablero

  }
  function moverPiezaLateralIzq(direccion) {
    let tableroAux = [...tablero]
    let coloresAux = [...coloresPiezas]
    let controlAltura = false;
    if (!colisionHorizontalLeft(tableroAux)) {
      for (let j = 0; j < (anchura - 1); j++) {
        for (let i = (altura - 1); i > 0; i--) {
          if (tableroAux[i][j] == null && tableroAux[(i)][(j + 1)] == 0) {
            tableroAux[i][j] = 0;
            tableroAux[(i)][(j + 1)] = null;
            coloresAux[i][j] = coloresAux[(i)][(j + 1)];
            coloresAux[(i)][(j + 1)] = "fondo";
          }
        }
      }
    }
    if (!controlAltura) {
      setTablero(tableroAux)
      setColoresPiezas(coloresAux)
    }
  }
  function moverPiezaLateralDer(direccion) {
    let tableroAux = [...tablero];
    let coloresAux = [...coloresPiezas];
    let controlAltura = false;

    if (!colisionHorizontalRight(tableroAux)) {
      for (let j = anchura - 1; j > 0; j--) {
        for (let i = altura - 1; i >= 0; i--) {
          if (tableroAux[i][j] === null && tableroAux[i][(j - 1)] === 0) {
            tableroAux[i][j - 1] = null;
            tableroAux[i][(j)] = 0;
            coloresAux[i][j] = coloresAux[i][(j - 1)];
            coloresAux[i][(j - 1)] = "fondo";
          }
        }
      }
    }

    if (!controlAltura) {
      setTablero(tableroAux);
      setColoresPiezas(coloresAux);
    }
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
        }
      }
    } else {
      pararPiezas();
      generarPieza()
      controlAltura = true;
    }

    if (!controlAltura) {
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
  function colisionHorizontalLeft(array) {
    for (let j = 0; j < anchura; j++) {
      for (let i = 0; i < altura; i++) {
        if (j == 0 && array[i][j] === 0) {
          return true;
        }
        if (array[i][(j - 1)] === 0 && array[i][(j - 2)] === 1) {
          return true;
        }
      }
    }
    return false;
  }
  function colisionHorizontalRight(array) {
    for (let j = anchura - 1; j > 0; j--) {
      for (let i = 0; i < altura; i++) {

        if (j === anchura - 1 && array[i][j] === 0) {
          return true;
        }
        if (array[i][j] === 0 && array[i][j + 1] === 1) {
          return true;
        }
      }
    }
    return false;
  }

  function colisionVertical(array) {

    for (let i = (altura - 1); i > 0; i--) {
      for (let j = 0; j < anchura; j++) {
        if (i == (altura - 1) && array[i][j] == 0) {
          return true;
        }

        if (array[i][j] == 1 && array[(i - 1)][j] == 0) {
          return true;
        }
      }
    }




    return false;
  }
  function girarPieza() {

  }

  function juegoEnMarcha() {
    generarPieza()
    idInterval = setInterval(moverPiezas, 200);
  }


  return (
    <>
      <h1>En desarrollo</h1>
      <Tablero
        tablero={tablero}
        setTablero={setTablero}
        coloresPiezas={coloresPiezas}
        setColoresPiezas={setColoresPiezas}
      ></Tablero>
      <button onClick={juegoEnMarcha}>Empezar</button>
      <button id="moverIzq" onClick={moverPiezaLateralIzq}>Izquierda</button>
      <button id="moverDer" onClick={moverPiezaLateralDer}>Derecha</button>
      <button id="girar" onClick={girarPieza}>Girar</button>
      {piezaSiguiente ? (
        <Pieza
          siguientePieza={piezasDisponibles[piezaSiguiente]}
          coloresPieza={colores[piezaSiguiente]}
        ></Pieza>
      ) : null}
    </>
  );

}

export default App;
