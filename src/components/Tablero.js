
import React, { useState, useEffect } from 'react';
import '../styles/Tablero.css';
function Tablero(props) {
  
  const altura = 20;
  const anchura = 10;
  


  
  function mostrarTablero() {
    const tabla = [];
    for (let i = 0; i < props.tablero.length; i++) {
      const fila = [];
      for (let j = 0; j < props.tablero[i].length; j++) {
        // Aquí puedes personalizar la representación visual de cada celda del props.tablero
        // Por ejemplo, si deseas aplicar estilos CSS, puedes usar un elemento <div> en lugar de <td>
        const celda = (
          <td key={`${i}-${j}`} className={props.coloresPiezas[i][j]}>
            
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
          <div id="fondoTablero">    <div className={(props.jugando)?"":"pausado"}>{mostrarTablero()}</div>
          {(props.jugando)?null:(<div id="gameOver">GAME OVER</div>)}
          
    </div>
      
    
  );
}

export default Tablero;
