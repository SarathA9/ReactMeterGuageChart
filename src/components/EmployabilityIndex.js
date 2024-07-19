import React, { useEffect, useState } from 'react';

const EmployabilityIndex = ({ percentage }) => {
  const [needleAngle, setNeedleAngle] = useState(-90);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const [svgSize, setSvgSize] = useState({ width: 200, height: 130 });

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.9, 600);
      const height = (width * 130) / 200;
      setSvgSize({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const targetAngle = (percentage / 100) * 180 - 90;
    const animationDuration = 1000; 
    const startTime = Date.now();

    const animateNeedle = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      
      // Simple linear interpolation
      const currentAngle = -90 + progress * (targetAngle + 90);

      setNeedleAngle(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animateNeedle);
      }
    };

    requestAnimationFrame(animateNeedle);
  }, [percentage]);

  useEffect(() => {
    const animationDuration = 1000; // Changed back to 1000ms
    const startTime = Date.now();

    const animatePercentage = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      const currentPercentage = Math.floor(progress * percentage);

      setDisplayedPercentage(currentPercentage);

      if (progress < 1) {
        requestAnimationFrame(animatePercentage);
      }
    };

    requestAnimationFrame(animatePercentage);
  }, [percentage]);

  const createMarkLine = (rotation) => (
    <line
      x1="100"
      y1="-2"
      x2="100"
      y2="8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      transform={`rotate(${rotation}, 100, 90)`}
    />
  );

  const createLabelWithDot = (x, y, color, label, transform) => (
    <g transform={transform}>
      <circle cx={x - 10} cy={y - 1} r="2" fill={color} stroke="rgba(230, 230, 230, 0.5)" strokeWidth=".1" />
      <text x={x} y={y} textAnchor="start" fontSize="4" fill="black">{label}</text>
    </g>
  );
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
        <svg 
          viewBox="-100 0 400 130" 
          width="100%" 
          height="100%" 
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF4B4B" />
              <stop offset="25%" stopColor="#FFA500" />
              <stop offset="50%" stopColor="#f4e910" />
              <stop offset="75%" stopColor="#90EE90" />
              <stop offset="100%" stopColor="#4CAF50" />
            </linearGradient>
          </defs>
          
          <path
            d="M20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="13"
          />
             
          {createMarkLine(-80)}
          {createMarkLine(-40)} 
          {createMarkLine(0)}
          {createMarkLine(40)}   
          {createMarkLine(80)}                
          
          <g transform={`rotate(${needleAngle}, 100, 90)`}>
            <path 
              d="M90 100 L100 12 L110 100 Q100 112 90 100" 
              fill="#E54545"      
              stroke="red" 
              strokeWidth="0"
            />
          </g>
          
          <circle cx="100" cy="90" r="12" fill="white" stroke="rgba(230, 230, 230, 0.9)" strokeWidth="2" />
          <text x="100" y="93" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily='normal'>{displayedPercentage}%</text>

          {createLabelWithDot(-30, 75, "#FF4B4B", "Need Improvement", "rotate(0, 45, 70)")}
          {createLabelWithDot(15, 20, "#FFFF00", "Developing", "rotate(0, 70, 40)")}
          {createLabelWithDot(90, -5, "#FFA500", "Sharpening", "")}
          {createLabelWithDot(180, 20, "#90EE90", "Good Progress", "rotate(0, 130, 40)")}
          {createLabelWithDot(210, 75, "#4CAF50", "Employable", "rotate(0, 155, 70)")}
          
        </svg>
      </div>
    </div> 
  );
};

export default EmployabilityIndex;