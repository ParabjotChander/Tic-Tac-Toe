import '../Assets/css/styles.css';

function Cell({value, onClick}){
  return <button onClick={onClick} className="square">{value}</button>
}

export default Cell;