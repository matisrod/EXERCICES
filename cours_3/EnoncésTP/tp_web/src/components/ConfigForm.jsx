import { OBJECTIVES_DATA } from '../constants/objectivesData';

function ConfigForm({
  selectedObjectives,
  setSelectedObjectives,
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
  rowCount,
  setRowCount
}) {

  // Fonction pour gérer la sélection multiple des objectifs
  const handleObjectiveChange = (objectiveId) => {
    if (selectedObjectives.includes(objectiveId)) {
      // Si l'objectif est déjà sélectionné, on le retire du tableau
      setSelectedObjectives(selectedObjectives.filter(id => id !== objectiveId));
    } else {
      // Sinon, on l'ajoute au tableau des sélections
      setSelectedObjectives([...selectedObjectives, objectiveId]);
    }
  };

  return (
    <section className="config-form">
      <h2>⚙️ Paramètres de calcul</h2>
      
      {/* 1. Sélection des objectifs */}
      <div className="form-group objectives-group">
        <h3>1. Sélectionnez un ou plusieurs objectifs</h3>
        <div className="checkboxes-container">
          {OBJECTIVES_DATA.map((obj) => (
            <label key={obj.id} className="checkbox-label">
              <input
                type="checkbox"
                value={obj.id}
                checked={selectedObjectives.includes(obj.id)}
                onChange={() => handleObjectiveChange(obj.id)}
              />
              {obj.label}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Paramètres de poids et de lignes */}
      <div className="form-group inputs-group">
        <h3>2. Définissez vos paramètres</h3>
        
        <div className="input-row">
          <label>
            Poids minimum (kg) :
            <input
              type="number"
              min="1"
              value={minWeight}
              onChange={(e) => setMinWeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="input-row">
          <label>
            Poids maximum (kg) :
            <input
              type="number"
              min={minWeight + 1}
              value={maxWeight}
              onChange={(e) => setMaxWeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="input-row">
          <label>
            Nombre de lignes :
            <input
              type="number"
              min="2"
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

export default ConfigForm;