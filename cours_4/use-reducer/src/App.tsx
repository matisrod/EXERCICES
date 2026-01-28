export function counterReducer() {}

function App() {
  return (
    <div id="app">
      <h1>The Counter</h1>
      <p id="actions">
        <button>Increment</button>
        <button>Decrement</button>
        <button>Reset</button>
      </p>
      <p id="counter"></p>
    </div>
  );
}

export default App;
