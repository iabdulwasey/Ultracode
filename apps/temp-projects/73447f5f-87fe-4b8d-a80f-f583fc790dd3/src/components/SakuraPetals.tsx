import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

const SakuraPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 15; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 8 + Math.random() * 10,
          size: 6 + Math.random() * 8,
          delay: Math.random() * 5
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-70"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animation: `sakura ${petal.animationDuration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(45deg, #ffb7c5, #ffc0cb)',
              borderRadius: '0 100% 0 100%',
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SakuraPetals;