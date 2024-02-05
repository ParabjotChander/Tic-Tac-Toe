import Cell from './Cell.jsx';
import '../Assets/css/styles.css';
import { useEffect, useState } from 'react';


function Board(){
  
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXturn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");
  
  function handleClick(getCurrentSquare){
    
    let cpySquares = [...squares];

    if(getWinner(cpySquares) || cpySquares[getCurrentSquare]){
      return;
    }
    
    cpySquares[getCurrentSquare] = isXturn ? 'X' : 'O';
    setIsXTurn(!isXturn);
    setSquares(cpySquares)
  
  }

  function handleRestart(){
    setIsXTurn(true);
    setSquares(Array(9).fill(''));
  }
  
  function getWinner(squares){
    const winningPatterns = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
  
    for(let i = 0; i < winningPatterns.length; i++){
      
      const [a, b, c] = winningPatterns[i];
    
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    
    }
  
    return null;
  }
  
  useEffect(()=>{

    if(!getWinner(squares) && squares.every(item => item !== '')){
      setStatus("This is a draw: Please restart the game!");
    }else if(getWinner(squares)){
      setStatus(`Winner is ${getWinner(squares)}, Please restart the game!`);
    }else{
      setStatus(`Next Player is ${isXturn ? 'X' : 'O'}`)
    }

  }, [squares, isXturn]);
  
  return (
    
    <div className="tic-tac-toe-container">

      <div className="row">
        <Cell value={squares[0]} onClick={() => handleClick(0)}/>
        <Cell value={squares[1]} onClick={() => handleClick(1)}/>
        <Cell value={squares[2]} onClick={() => handleClick(2)}/>
      </div>
      
      <div className="row">
        <Cell value={squares[3]} onClick={() => handleClick(3)}/>
        <Cell value={squares[4]} onClick={() => handleClick(4)}/>
        <Cell value={squares[5]} onClick={() => handleClick(5)}/>
      </div>
      
      <div className="row">
        <Cell value={squares[6]} onClick={() => handleClick(6)}/>
        <Cell value={squares[7]} onClick={() => handleClick(7)}/>
        <Cell value={squares[8]} onClick={() => handleClick(8)}/>
      </div>
    
      <h2>{status}</h2>  
    
      <button className="restart" onClick={handleRestart}>Restart</button>
    
    </div>
  
  );

}

export default Board;