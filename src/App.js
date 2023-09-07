import logo from './logo.svg';
import './App.css';
import Tablero from './components/Tablero';
import { useState } from 'react';

function App() {
  const [tablero, setTablero] = useState([]);
  return (
    <Tablero tablero={tablero} setTablero={setTablero}></Tablero>  );
}

export default App;
