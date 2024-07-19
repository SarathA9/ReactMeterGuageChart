// GaugeChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const GaugeChart = ({ percentage }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#FF5733', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%',
    rotation: 0.75 * Math.PI,
    circumference: 0.5 * Math.PI,
    tooltips: { enabled: false },
    legend: { display: false },
  };

  return (
    <div className="gauge-chart">
      <Doughnut data={data} options={options} />
      <div className="needle" style={{ transform: `rotate(${percentage * 1.8}deg)` }} />
    </div>
  );
};

export default GaugeChart;
