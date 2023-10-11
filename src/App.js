import './App.css';
import Tablero from './components/Tablero';
import { useEffect, useState } from 'react';
import Pieza from './components/Pieza';

function App() {
  const [tablero, setTablero] = useState([]);
  const [posicion, setPosicion] = useState(0);
  const [coloresPiezas, setColoresPiezas] = useState([]);
  const [jugando, setJugando] = useState(true);
  const [piezaActual, setPiezaActual] = useState(0);
  const [piezaSiguiente, setPiezaSiguiente] = useState(0);

  const altura = 10;
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
      let siguiente=siguientePieza();
      setPiezaSiguiente(siguiente)
    console.log("generando");
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
    console.log(piezaSiguiente);
      let numeroPiezaSiguiente = siguientePieza(); // Obtén el nuevo valor de piezaSiguiente
      console.log("siguiente " + numeroPiezaSiguiente);
      let numeroPiezaActual = piezaSiguiente; // Obtén el valor actual de piezaSiguiente
      console.log("actual " + numeroPiezaActual);
      
      // Asegúrate de que el valor de piezaSiguiente se actualice en el estado de React
      setPiezaSiguiente(numeroPiezaSiguiente);
      
      // Luego, actualiza el valor de piezaActual
      setPiezaActual(numeroPiezaActual);
      console.log("siguiente"+ numeroPiezaSiguiente);
    if (jugando) {
      
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
  function calcularAltura(pieza) {
    
    const bloque = pieza
    
    const filas = bloque[0].length;
    const columnas = bloque.length;
    
    let alturaMaxima = 0;

    for (let i = 0; i < columnas; i++) {
      for (let j = 0; j < filas; j++) {
        if (bloque[i][j] ===0) {
          alturaMaxima++;
          break;
        }
      }
    }
    return alturaMaxima;
  }
  

  function colocarPieza(pieza, inicio) {
    console.log("colocando "+pieza);
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
    comprobarLinea()
  }
  function contieneVacio(matriz){
    for (let i = 0; i < matriz.length; i++) {
     if(matriz[i][0]==null){
      return i
     }
      
    }
    return -1
  }
  function comprobarLinea(){
    let tableroAux = [...tablero];
    let coloresAux = [...coloresPiezas];
    let lineasBorrar=[];
    for (let i = (altura - 1); i > 0; i--) {
      let linea=true;
      for (let j = 0; j < anchura; j++) {
        if ((tableroAux[i][j] !== 1)) {
          linea=false;
        }
      }
      if(linea){
        lineasBorrar.push(i)
      }
    }
    if(lineasBorrar.length>0){
      borrarLineas(lineasBorrar,tableroAux)
      borrarLineas(lineasBorrar,coloresAux)
      console.log(lineasBorrar);
      lineasBorrar.forEach(element => {
        bajarLinea(element,tableroAux,null)
        bajarLinea(element,coloresAux,"fondo")
      });
      
      
      
      
    }
  }
  
  function borrarLineas(lineas,array){
    lineas=lineas.sort((a, b) => b - a);
    // Itera a través de los números en el array y copia el contenido de las filas superiores.
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < lineas.length; j++) {
        array[lineas[j]][i]=null;
      }
    }
    return array;
  }
  function bajarLinea(linea,matriz,hueco){
    for (let i = linea; i >0; i--) {
      if(i==0){
        for (let j = 0; j < anchura; j++) {
          matriz[i][j]=hueco
        }
      }else{
        for (let j = 0; j < anchura; j++) {
          matriz[i][j]=matriz[i-1][j]
        }
      }   
    }
    console.log(...matriz);
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
    idInterval = setInterval(moverPiezas, 300);
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
    let boundingSquare = giros[piezaActual][posicion];    
    
    
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
    console.log(minY);
    
    
    
    
    let contador1 = contarPiezas(tableroAuxOriginal)
    // Actualiza la matriz original con los valores rotados en el centro.
    if(minX + calcularAnchura(rotatedSquare)>10){
      let posicionAux=posicion;
      if(posicion-1>=0){
        posicionAux--;
      }
      console.log("cancelando");
      setPosicion(posicionAux)
      return
    }
    console.log(minY + calcularAltura(rotatedSquare));
    if(minX==-1||minY + calcularAltura(rotatedSquare)>altura){
      let posicionAux=posicion;
      if(posicion-1>=0){
      }
      setPosicion(posicionAux)
      return
    }
    let choquePieza=false;
    let maxVal = Math.max(rotatedSquare.length, giros[piezaActual][posicion].length);
    for (let i = minY; i < minY + 3; i++) {       
      for (let j = minX; j < minX + 3; j++) {
        if(j==anchura||i==altura){
          console.log("altura maxima");
          choquePieza=true;
          break;
        }
        if (tableroAux[i][j]==1&&rotatedSquare[i - minY][j - minX]==0||tableroAux[i][j]==1&&rotatedSquare[i - minY][j - minX]==null) {
          console.log("coque pieza");
          choquePieza=true;
          break;
        }
      }
    }
    if(choquePieza){
      return
    }
    for (let i = minY; i < minY + 3; i++) {       
      for (let j = minX; j < minX + 3; j++) {
              
        tableroAux[i][j] = rotatedSquare[i - minY][j - minX];
        colors[i][j] = rotatedSquareColours[i - minY][j - minX];
      }
      
    }
    let contador2 = contarPiezas(tableroAux)
    console.log(...tableroAux);
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
        }
        setPosicion(posicionAux)
        setTablero(tableroAuxOriginal)
        setColoresPiezas(colorsOriginal)
      }
    }else{
      setTablero(tableroAuxOriginal)
      setColoresPiezas(colorsOriginal)
    }
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
