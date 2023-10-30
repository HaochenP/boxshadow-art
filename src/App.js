import logo from './logo.svg';
import './App.css';
import PixelCanvas from './PixelCanvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Pixel Art Generator</h1>
      <PixelCanvas width={30} height={30} />
      </header>
    </div>
  );
}

export default App;
