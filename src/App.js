import './App.css';
import Cards from './components/cards';
function App() {
  const data = [
    { title: 'Card 1', description: 'Description of Card 1' },
    { title: 'Card 2', description: 'Description of Card 2' },
    { title: 'Card 3', description: 'Description of Card 3' },
    // Add more data objects as needed
  ];
  return (
    <div className="App">
      <Cards data={data}/>
    </div>
  );
}

export default App;
