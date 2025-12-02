import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const SpinWheel = ({ isSpinning: externalIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const segments = [
    { label: 'MISS', color: '#1A4D3E', textColor: '#FFD700' },      // Teal/Green
    { label: '10x', color: '#8B1A1A', textColor: '#FFD700' },       // Maroon/Red
    { label: '5x', color: '#1A4D3E', textColor: '#FFD700' },        // Teal/Green
    { label: '3x', color: '#C9941A', textColor: '#1A1A1A' },        // Gold
    { label: '0x', color: '#1A3A5C', textColor: '#FFD700' },        // Dark Blue
    { label: '1SS', color: '#8B1A1A', textColor: '#FFD700' },       // Maroon/Red
    { label: '1x', color: '#1A4D3E', textColor: '#FFD700' },        // Teal/Green
    { label: '5x', color: '#5A2A7C', textColor: '#FFD700' },        // Purple
  ];

  React.useEffect(() => {
    if (externalIsSpinning && !isSpinning) {
      handleSpin();
    }
  }, [externalIsSpinning]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const spins = 5 + Math.random() * 3;
    const randomDegree = Math.random() * 360;
    const newRotation = rotation + spins * 360 + randomDegree;
    setRotation(newRotation);
    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="flex justify-center my-6">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-radial from-yellow-600/40 to-transparent rounded-full scale-110" />

        {/* Wheel container */}
        <div className="relative w-[500px] h-[500px]">
          {/* Top pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 -translate-y-2">
            <div className="relative">
              <div
                className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-[#C9941A]"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[28px] border-t-[#FFD700]" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8B6914] rounded-full" />
            </div>
          </div>

          {/* Spinning wheel */}
          <motion.div
            className="relative w-full h-full"
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Outer gold rim */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9941A 25%, #FFD700 50%, #8B6914 75%, #FFD700 100%)',
                boxShadow: 'inset 0 -8px 20px rgba(0,0,0,0.4), inset 0 8px 20px rgba(255,255,255,0.3), 0 20px 40px rgba(0,0,0,0.6)',
              }}
            />

            {/* Inner rim border */}
            <div
              className="absolute inset-[12px] rounded-full"
              style={{
                background: 'linear-gradient(135deg, #8B6914 0%, #FFD700 50%, #8B6914 100%)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
              }}
            />

            {/* Rivets on outer rim */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #FFD700, #8B6914)',
                  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translateY(-240px) translateX(-50%)`,
                  transformOrigin: 'center',
                }}
              />
            ))}

            {/* Wheel segments */}
            <svg className="absolute inset-[20px] w-[calc(100%-40px)] h-[calc(100%-40px)]" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#A82020', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#8B1A1A', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#6B1515', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2A6B52', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#1A4D3E', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#143A30', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2A4A7C', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#1A3A5C', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#142A44', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#E6B42A', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#C9941A', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#A67C15', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#7A3A9C', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#5A2A7C', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#4A1A6C', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              {segments.map((segment, i) => {
                const angle = (360 / segments.length) * i - 90;
                const angleRad = (angle * Math.PI) / 180;
                const nextAngleRad = ((angle + 360 / segments.length) * Math.PI) / 180;
                const x1 = 100 + 90 * Math.cos(angleRad);
                const y1 = 100 + 90 * Math.sin(angleRad);
                const x2 = 100 + 90 * Math.cos(nextAngleRad);
                const y2 = 100 + 90 * Math.sin(nextAngleRad);
                const gradientMap = {
                  '#8B1A1A': 'url(#redGrad)',
                  '#1A4D3E': 'url(#greenGrad)',
                  '#1A3A5C': 'url(#blueGrad)',
                  '#C9941A': 'url(#goldGrad)',
                  '#5A2A7C': 'url(#purpleGrad)',
                };
                return (
                  <g key={i}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                      fill={gradientMap[segment.color] || segment.color}
                      stroke="#8B6914"
                      strokeWidth="1.5"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    />
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                      fill="none"
                      stroke="rgba(255, 215, 0, 0.3)"
                      strokeWidth="0.5"
                    />
                  </g>
                );
              })}

              {/* Segment text */}
              {segments.map((segment, i) => {
                const angle = (360 / segments.length) * i;
                const textAngle = angle + 360 / segments.length / 2;
                const textAngleRad = ((textAngle - 90) * Math.PI) / 180;
                const textX = 100 + 60 * Math.cos(textAngleRad);
                const textY = 100 + 60 * Math.sin(textAngleRad);
                return (
                  <text
                    key={i}
                    x={textX}
                    y={textY}
                    fill={segment.textColor}
                    fontSize="18"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                    style={{
                      fontFamily: 'serif',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)',
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
                    }}
                  >
                    {segment.label}
                  </text>
                );
              })}
            </svg>

            {/* Center hub */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9941A 50%, #8B6914 100%)',
                boxShadow: 'inset 0 -6px 16px rgba(0,0,0,0.4), inset 0 6px 16px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="absolute inset-[4px] rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8B6914 0%, #C9941A 50%, #FFD700 100%)',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
                }}
              >
                <div
                  className="absolute inset-[3px] rounded-full bg-[#0a0a0a] flex flex-col items-center justify-center"
                  style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)' }}
                >
                  <div className="text-[#FFD700] text-3xl mb-1" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                    ♠
                  </div>
                  <div className="text-[#FFD700] text-sm font-bold tracking-wider" style={{ fontFamily: 'serif', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    NASIIB
                  </div>
                  <div className="flex gap-1 mt-1">
                    <div className="w-1 h-1 rounded-full bg-[#FFD700]" />
                    <div className="w-1 h-1 rounded-full bg-[#FFD700]" />
                    <div className="w-1 h-1 rounded-full bg-[#FFD700]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
