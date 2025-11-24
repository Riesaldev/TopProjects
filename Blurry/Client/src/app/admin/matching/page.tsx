'use client';

import React, { useState } from "react";

export default function AdminMatchingPage() {
  const [ageWeight, setAgeWeight] = useState(50);
  const [distanceWeight, setDistanceWeight] = useState(50);
  const [interestsWeight, setInterestsWeight] = useState(50);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Ajustes de Matching</h1>
      <div className="bg-white rounded shadow p-6 flex flex-col gap-6 w-full max-w-md">
        <div>
          <label htmlFor="age-weight" className="block font-semibold mb-1">Peso Edad: {ageWeight}%</label>
          <input id="age-weight" type="range" min={0} max={100} value={ageWeight} onChange={e => setAgeWeight(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label htmlFor="distance-weight" className="block font-semibold mb-1">Peso Distancia: {distanceWeight}%</label>
          <input id="distance-weight" type="range" min={0} max={100} value={distanceWeight} onChange={e => setDistanceWeight(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label htmlFor="interests-weight" className="block font-semibold mb-1">Peso Intereses: {interestsWeight}%</label>
          <input id="interests-weight" type="range" min={0} max={100} value={interestsWeight} onChange={e => setInterestsWeight(Number(e.target.value))} className="w-full" />
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 mt-4">Probar configuración</button>
      </div>
    </main>
  );
} 