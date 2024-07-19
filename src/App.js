import React from 'react';
import EmployabilityGauge from './components/EmployabilityGauge';
import EmployabilityIndex from './components/EmployabilityIndex';
const App = () => {
  return (
    <div>
      <EmployabilityGauge percentage={78} />

    </div>
  );
};

export default App;