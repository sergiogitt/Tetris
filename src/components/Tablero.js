
import React, { useState, useEffect } from 'react';
import '../styles/Tablero.css';
function Tablero(props) {
  
  const altura = 15;
  const anchura = 8;


  useEffect(() => {
    // Función para inicializar el tablero
    const inicializarTablero = () => {
      const tableroAux = [];
      for (let i = 0; i < altura; i++) {
        const filaAux = Array(anchura).fill(null); // Llena la fila con valores nulos
        tableroAux.push(filaAux);
      }
      props.setTablero(tableroAux);
    };

    // Llamar a la función de inicialización cuando el componente se monta
    inicializarTablero();
  }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente
  function iniciarJuego(){
    generarPieza()
  }
  function generarPieza(){

  }
  function mostrarTablero() {
    const tabla = [];
    for (let i = 0; i < props.tablero.length; i++) {
      const fila = [];
      for (let j = 0; j < props.tablero[i].length; j++) {
        // Aquí puedes personalizar la representación visual de cada celda del props.tablero
        // Por ejemplo, si deseas aplicar estilos CSS, puedes usar un elemento <div> en lugar de <td>
        const celda = (
          <td key={`${i}-${j}`}>
            {props.tablero[i][j]}
          </td>
        );
        fila.push(celda);
      }
      tabla.push(<tr key={i}>{fila}</tr>);
    }
    return (
      <table>
        <tbody>
          {tabla}
        </tbody>
      </table>
    );
  }
  
  return (
    <div>{mostrarTablero()}</div>
      
    
  );
}

export default Tablero;
