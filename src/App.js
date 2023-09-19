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
  const colores = ["square", "t", "l", "z"]
  let idInterval;
  const piezasDisponibles = [
    
    
    [
      
      [0,0,0,0],
      [null, null, null,null],
      [null, null, null,null],
      [null, null, null,null]
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
      setColoresPiezas(tableroColoresAux);
    };



    // Inicializa el tablero
    inicializarTablero();

    // Agrega el event listener al montar el componente

  }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente
  // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente
  useEffect(() => {
    // Función para inicializar el tablero


    // Agregar event listener para la tecla "W" en el documento
    const handleKeyLeft = (event) => {
      if (event.key === 'a' || event.key === 'A') {
        // El usuario ha presionado la tecla "W"
        moverPiezaLateralIzq()
        // Puedes realizar acciones adicionales aquí
      }
    };

    // Inicializa el tablero

    // Agrega el event listener al montar el componente
    document.addEventListener('keydown', handleKeyLeft);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKeyLeft);
    };
  }, [tablero]);
  function siguientePieza() {
    return Math.floor(Math.random() * piezasDisponibles.length); // Genera un número entre 0 (inclusive) y 4 (exclusivo)

  }
  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'a' || event.key === 'A'||event.key==='ArrowLeft') {
        //moverPiezaLateralIzq("left");
        document.getElementById("moverIzq").click()
        // Puedes realizar acciones adicionales aquí
      }
      if (event.key === 'd' || event.key === 'D'||event.key==='ArrowRight') {
        //moverPiezaLateralIzq("left");
        document.getElementById("moverDer").click()
        // Puedes realizar acciones adicionales aquí
      }
      console.log(event.key);
    };

    // Agrega el event listener al montar el componente
    window.addEventListener('keyup', handleKeyUp);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
          tableroAuxColores[i][col] = colores[pieza]

        }
      }
    }

    // Actualiza el estado con la nueva copia del tablero
    setTablero(tableroAux);
    setColoresPiezas(tableroAuxColores)
  }
  function moverPiezaLateralIzq(direccion) {
    let tableroAux = [...tablero]
    let coloresAux = [...coloresPiezas]
    let controlAltura = false;
    if (!colisionHorizontalLeft(tableroAux)){
      for (let j = 0; j < (anchura - 1); j++) {
        for (let i = (altura - 1); i > 0; i--) {
          //console.log(tableroAux[i][j+1]);
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
    console.log(("actualizo"));
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
        console.log("dere");
        if (tableroAux[i][j] === null && tableroAux[i][(j - 1)] === 0) {
          tableroAux[i][j-1] = null;
          tableroAux[i][(j)] = 0;
          coloresAux[i][j] = coloresAux[i][(j - 1)];
          coloresAux[i][(j - 1)] = "fondo";
        }
      }
    }
    console.log(...tableroAux);
    console.log(...coloresAux);
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
    generarPieza(siguientePieza())
    controlAltura=true;
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
function colisionHorizontalLeft(array) {
  console.log(...array);
  for (let j = 0; j < anchura; j++) {
    for (let i = 0; i < altura; i++) {
      if (j == 0 && array[i][j] === 0) {
        console.log("Chocó con el borde izquierdo en (" + i + ", " + j + ")");
        return true;
      }
      if (array[i][(j-1)] === 0 && array[i][(j - 2)] === 1) {
        console.log("Chocó con un bloque en (" + i + ", " + j + ")");
        return true;
      }
    }
  }
  return false;
}
function colisionHorizontalRight(array) {
  console.log(...array);
  for (let j = anchura - 1; j > 0; j--) {
    for (let i = 0; i < altura; i++) {
    
      if (j === anchura - 1 && array[i][j] === 0) {
        console.log("Chocó con el borde derecho en (" + i + ", " + j + ")");
        return true;
      }
      if (array[i][j] === 0 && array[i][j + 1] === 1) {
        console.log("Chocó con un bloque en (" + i + ", " + j + ")");
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
          console.log("choco con abajo" + i + " " + j);
          return true;
        }

        if (array[i - 1][j] == 1 && array[(i - 2)][j] == 0) {
          console.log("choco con bloque");


          return true;
        }
      }
    }




    return false;
  }

  function juegoEnMarcha() {
    generarPieza(0);

    // Usamos una función anónima dentro de setTimeout para evitar la llamada inmediata
    // Usamos setInterval para llamar a moverPiezas cada 2000 milisegundos (2 segundos)
    idInterval = setInterval(moverPiezas, 500);
  }


  return (
    <><h1>En desarrollo</h1>
      <Tablero tablero={tablero} setTablero={setTablero} generarPieza={generarPieza} coloresPiezas={coloresPiezas} setColoresPiezas={setColoresPiezas}></Tablero>
      <button onClick={() => juegoEnMarcha()}>Empezar</button><button id="moverIzq" onClick={() => moverPiezaLateralIzq()}>seguir</button>
      <button id="moverDer" onClick={() => moverPiezaLateralDer()}>dere</button>
    </>);
}

export default App;
