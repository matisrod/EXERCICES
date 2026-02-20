import { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import ProteinTable from './components/ProteinTable';
import './App.css';

function App() {
  const [selectedObjectives, setSelectedObjectives] = useState([]);
  const [minWeight, setMinWeight] = useState(50);
  const [maxWeight, setMaxWeight] = useState(100);
  const [rowCount, setRowCount] = useState(6);

  const isValid = minWeight > 0 
               && maxWeight > minWeight 
               && rowCount > 1 
               && selectedObjectives.length > 0;

  return (
    <div className="app-container">
      <header>
        <h1>Besoins en Protéines</h1>
        <p>Générez dynamiquement votre tableau personnalisé.</p>
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

        {isValid ? (
          <ProteinTable 
            selectedObjectives={selectedObjectives}
            minWeight={minWeight}
            maxWeight={maxWeight}
            rowCount={rowCount}
          />
        ) : (
          <div className="alert-message">
            <p>⚠️ Veuillez sélectionner au moins un objectif et vous assurer que le poids maximum est supérieur au poids minimum.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;