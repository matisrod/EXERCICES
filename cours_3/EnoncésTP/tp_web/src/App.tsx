import { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import ProteinTable from './components/ProteinTable';
import './App.css';

function App() {
  const [selectedObjectives, setSelectedObjectives] = useState([]);
  const [minWeight, setMinWeight] = useState(50);
  const [maxWeight, setMaxWeight] = useState(100);
  const [rowCount, setRowCount] = useState(6);

  // constantes booleennes pour savoir si on peut afficher le tableau ou pas
  const isValid = minWeight > 0 && maxWeight > minWeight && rowCount > 2 && rowCount < 500; // on met un nombre de ligne max et min
  const hasObjectives = selectedObjectives.length > 0;

  return (
    <div className="app-container">
      <header>
        <h1>Besoins en Protéines</h1>
      </header>
      
      <main>
        <ConfigForm
          selectedObjectives={selectedObjectives}
          setSelectedObjectives={setSelectedObjectives}
          minWeight={minWeight}
          setMinWeight={setMinWeight}
          maxWeight={maxWeight}
          setMaxWeight={setMaxWeight}
          rowCount={rowCount}
          setRowCount={setRowCount}
        />

        {isValid && hasObjectives ? (
          <ProteinTable 
            selectedObjectives={selectedObjectives}
            minWeight={minWeight}
            maxWeight={maxWeight}
            rowCount={rowCount}
          />
        ) : (
          <div className="alert-message">
            <p>Sélectionnez au moins un objectif et vérifiez vos poids min/max pour afficher le tableau.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;