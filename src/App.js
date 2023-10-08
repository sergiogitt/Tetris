import './App.css';
import Tablero from './components/Tablero';
import { useEffect, useState } from 'react';
import Pieza from './components/Pieza';

function App() {
  const [tablero, setTablero] = useState([]);
  const [posicion, setPosicion] = useState(0);
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
      [0, null, null],
      [0, null, null],
      [0, null, null]
    ],
    [
      [0, 0, null],
      [0, 0, null],
      [null, null, null]
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
      [0, null, null],
      [0, 0, null],
      [null, 0, null]]
    
  ]
  const giros = [
    [
      [
        [null, 0, null],
        [null, 0, null],
        [null, 0, null]
      ],
      [
        [null, null, null],
        [0, 0, 0],
        [null, null, null]
      ]
    ],
    [
      [
        [0, 0, null],
        [0, 0, null]
      ]
    ],
    [
      [
        [null, 0, null],
        [0, 0, null],
        [null, 0, null]
      ],
      [
        [null, 0, null],
        [0, 0, 0],
        [null, null, null]
      ],
      [
        [null, 0, null],
        [null, 0, 0],
        [null, 0, null]
      ],
      [
        [null, null, null],
        [0, 0, 0],
        [null, 0, null]
      ]

    ],
    [
      [
        [0, null, null],
        [0, null, null],
        [0, 0, null]
      ], [
        [0, 0, 0],
        [0, null, null],
        [null, null, null],
      ],
      [
        [null, 0, 0],
        [null, null, 0],
        [null, null, 0]
      ],
      [
        [null, null, null],
        [null, null, 0],
        [0, 0, 0],

      ]

    ],
    [
      [
        [0, null, null],
        [0, 0, null],
        [null, 0, null]
      ],
      [
        [null, 0, 0],
        [0, 0, null],
        [null, null, null]
      ],
      [
        [null, 0, null,null],
        [null, 0, 0,null],
        [null, null, 0,null]
      ],
      [
        [null, null, null],
        [null, 0, 0],
        [0, 0, null],
      ]
      

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
    setPosicion(0)
    return Math.floor(Math.random() * piezasDisponibles.length); // Genera un número entre 0 (inclusive) y 4 (exclusivo)

  }
  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key ==='a' || event.key ==='A' || event.key ==='ArrowLeft') {
        document.getElementById("moverIzq").click()
      }
      if (event.key ==='d' || event.key ==='D' || event.key ==='ArrowRight') {
        document.getElementById("moverDer").click()
      }
      if (event.key ==='w' || event.key ==='W' || event.key ==='ArrowUp') {
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
      let numeroPiezaActual = 0;
      let numeroPiezaSiguiente = 0;
      if (piezaActual ===null) {
        console.log("genero nuevo");
        numeroPiezaActual = 4;
        setPiezaActual(numeroPiezaActual);
      } else {
        setPiezaActual(piezaSiguiente); // Cambia piezaSiguiente a numeroPiezaSiguiente
      }
      console.log("actual " + numeroPiezaActual);

      numeroPiezaSiguiente = siguientePieza();
      console.log("siguiente " + numeroPiezaSiguiente);
      setPiezaSiguiente(numeroPiezaSiguiente);

      let anchuraPieza = calcularAnchura(piezasDisponibles[numeroPiezaActual]);
      let inicio = anchura - anchuraPieza;
      if (inicio % 2 ===0) {
        inicio = inicio / 2;
      } else {
        inicio = (inicio + 1) / 2;
      }
      colocarPieza(numeroPiezaActual, inicio);
    }
  }

  function calcularAnchura(pieza) {
    
    const bloque = pieza
    
    const filas = bloque[0].length;
    const columnas = bloque.length;
    
    let anchuraMaxima = 0;

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (bloque[j][i] ===0) {
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
          if (bloque[i][j] === 0) {
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
  function moverPiezaLateralIzq() {
    let tableroAux = [...tablero]
    let coloresAux = [...coloresPiezas]
    let controlAltura = false;
    if (!colisionHorizontalLeft(tableroAux)) {
      for (let j = 0; j < (anchura - 1); j++) {
        for (let i = (altura - 1); i >= 0; i--) {
          if (tableroAux[i][j] === null && tableroAux[(i)][(j + 1)] === 0) {
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
          if (tableroAux[i][j] ===null && tableroAux[i][(j - 1)] ===0) {
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
    let tableroAux =  [...tablero]
    let coloresAux = [...coloresPiezas]
    let controlAltura = false;
    if (!colisionVertical(tableroAux)) {
      for (let i = (altura - 1); i > 0; i--) {
        for (let j = 0; j < anchura; j++) {
          //if (!colisionVertical(i, j, tableroAux)) {
          if (tableroAux[i][j] === null && tableroAux[(i - 1)][j] === 0) {
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
        if ((tableroAux[i][j] === 0)) {
          tableroAux[i][j] = 1
        }
      }
    }
    setTablero(tableroAux)
  }
  function colisionHorizontalLeft(array) {
    for (let j = 0; j < anchura; j++) {
      for (let i = 0; i < altura; i++) {
        if (j === 0 && array[i][j] ===0) {
          return true;
        }
        if (array[i][(j - 1)] ===0 && array[i][(j - 2)] ===1) {
          return true;
        }
      }
    }
    return false;
  }
  function colisionHorizontalRight(array) {
    for (let j = anchura - 1; j > 0; j--) {
      for (let i = 0; i < altura; i++) {

        if (j ===anchura - 1 && array[i][j] ===0) {
          return true;
        }
        if (array[i][j] ===0 && array[i][j + 1] ===1) {
          return true;
        }
      }
    }
    return false;
  }

  function colisionVertical(array) {

    for (let i = (altura - 1); i > 0; i--) {
      for (let j = 0; j < anchura; j++) {
        if (i === (altura - 1) && array[i][j] === 0) {
          return true;
        }

        if (array[i][j] === 1 && array[(i - 1)][j] === 0) {
          return true;
        }
      }
    }




    return false;
  }
  function contarPiezas(array) {
    let contador = 0;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        if (array[i][j] === 1||array[i][j] === 0) {
          contador++;
        }

      }
    }
    return contador;
  }
  function colisionGiros(matrix, matrixOriginal) {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].length > anchura) {
        console.log(matrix[i].length);
        console.log("tope lado");
        return true;
      }
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrixOriginal[i][j] === 1 && matrix[i][j] === 0) {
          console.log("tope ficha");
          return true;
        }
      }
    }

    return false;
  }

  function juegoEnMarcha() {
    generarPieza()
    //setTimeout(moverPiezas,1000)
    //setTimeout(moverPiezas,2000)
    idInterval = setInterval(moverPiezas, 1000);
  }
  function findBoundingSquare(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    let minX = numCols; // Inicializa los valores de minX, minY, maxX y maxY con valores extremos.
    let minY = numRows;
    let maxX = -1;
    let maxY = -1;

    // Encuentra las coordenadas del rectángulo que rodea a los elementos '1'.
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (matrix[i][j] ===0) {
          minX = Math.min(minX, j);
          minY = Math.min(minY, i);
          maxX = Math.max(maxX, j);
          maxY = Math.max(maxY, i);
        }
      }
    }


    // Calcula las dimensiones del cuadrado que rodea a los elementos '1'.
    const squareSize = Math.max(maxX - minX + 1, maxY - minY + 1);
    return { minX, minY, squareSize };
  }

  function rotateBoundingSquare(matrix) {
    
    if ((posicion + 1) >= giros[piezaActual].length) {
      setPosicion(0)
      return giros[piezaActual][0]
    } else {
      let nueva_posicion = posicion + 1;
      setPosicion(nueva_posicion)
      return giros[piezaActual][nueva_posicion]
    }
  }
  function rotateBoundingSquareColours(matrix) {
    let colors = [];
    for (let i = 0; i < matrix.length; i++) {
      let fila = [];
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] === 0) {
          fila.push(colores[piezaActual])
        } else {
          fila.push("fondo")
        }
      }
      colors.push(fila)
    }
    return colors;
  }
  function copiaArray(array){
    let aux=[];
    for (let i = 0; i < array.length; i++) {
      let fila=[];
      for (let j = 0; j < array[i].length; j++) {
        fila.push(array[i][j])
      }
      aux.push(fila);

      
    }
    console.log(aux);
    return aux;
  }
  function rotateConnectedOnes() {
    if(piezaActual==1){return}
    let tableroAuxOriginal = [...tablero]
    let colorsOriginal = [...coloresPiezas]
    let tableroAux = [...tablero]
    let colors = [...coloresPiezas]
    let { minX, minY, squareSize } = findBoundingSquare(tableroAux);
    // Extrae la matriz cuadrática que rodea a los elementos '1'.
    let boundingSquare = [];
    let boundingSquareColours = [];
    for (let i = minY; i < minY + squareSize; i++) {
      let row = [];
      let row2 = [];
      for (let j = minX; j < minX + squareSize; j++) {
        row.push(tableroAux[i][j]);
        row2.push(colors[i][j]);
      }
      boundingSquare.push(row);
      boundingSquareColours.push(row2);
    }
    // Rota la matriz cuadrática.
    let rotatedSquare = rotateBoundingSquare(boundingSquare);
    let rotatedSquareColours = rotateBoundingSquareColours(rotatedSquare);
    // Actualiza la matriz original con los valores rotados.
    
    if (piezaActual === 0 && posicion === 0) {
      minX--;
    }
    if (piezaActual === 0 && posicion === 1) {
      minY--;
    }
    if (piezaActual === 2 && posicion === 2) {
      minX--;
    }
    if (piezaActual === 2 && posicion === 3) {
      minY--;
    }
    if (piezaActual === 3 && posicion === 2) {
      minX--;
    }
    if (piezaActual === 3 && posicion === 3) {
      minY--;
    }
    if (piezaActual === 4 && posicion === 2) {
      minX--;
    }
    
    
    
    let contador1 = contarPiezas(tableroAuxOriginal)
    // Actualiza la matriz original con los valores rotados en el centro.
    console.log(minX + calcularAnchura(rotatedSquare));
    console.log(rotatedSquare);
    if(minX + calcularAnchura(rotatedSquare)>10){
      let posicionAux=posicion;
      if(posicion-1>=0){
        posicionAux--;
      }
      console.log("cancelando");
      setPosicion(posicionAux)
      return
    }
    console.log(...tableroAux);
    let anchuraAmpliar=3;
    
    if(minX==-1){
      let posicionAux=posicion;
      if(posicion-1>=0){
      }
      setPosicion(posicionAux)
      return
    }
    let maxVal = Math.max(rotatedSquare.length, giros[piezaActual][posicion].length);
    console.log(maxVal);
    for (let i = minY; i < minY + 3; i++) {       
      for (let j = minX; j < minX + 3; j++) {
        console.log(j);
        if(j==anchura){
          break;
        }
        
        tableroAux[i][j] = rotatedSquare[i - minY][j - minX];
        colors[i][j] = rotatedSquareColours[i - minY][j - minX];
      }
    }
    console.log(...tableroAux);
    let contador2 = contarPiezas(tableroAux)
    
    if(!colisionGiros(tableroAux, tableroAuxOriginal)){
      if((contador1 === contador2)){
        console.log("noo hay colision");
        setTablero(tableroAux)
        setColoresPiezas(colors)
      }else{
        console.log("hay colision");
        console.log(contador1+" "+contador2);
        let posicionAux=posicion;
        if(posicion-1>=0){
          posicionAux--;
        }else{
          //posicionAux=giros[piezaActual].length-1
        }
        setPosicion(posicionAux)
        setTablero(tableroAuxOriginal)
        setColoresPiezas(colorsOriginal)
      }
    }else{
      setTablero(tableroAuxOriginal)
      setColoresPiezas(colorsOriginal)
    }
    console.log([...tableroAux]);
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
      <button id="girar" onClick={rotateConnectedOnes}>Girar</button>
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
