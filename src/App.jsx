import { useState } from 'react';
import { calculate } from './services/api'; // This imports your API function

function App() {
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    const data = await calculate({ /* your data here */ });
    setResult(data);
  };

  return (
    <div>
      <h1>Sheet Planner Pro</h1>
      <button onClick={handleCalculate}>Calculate</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default App;