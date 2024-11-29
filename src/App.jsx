import React from 'react';
import CelestialSystem2 from './CelestialSystem2.jsx';

function App() {
    const configurations = [
        ["Comet", "DwarfPlanet", "EmptySpace", "GasCloud", "PlanetX"],
        ["Asteroid", "DwarfPlanet", "EmptySpace", "GasCloud", "PlanetX"],
        ["Asteroid", "Comet", "EmptySpace", "GasCloud", "PlanetX"],
        ["Asteroid", "Comet", "DwarfPlanet", "GasCloud", "PlanetX"]
    ];

    return (
        <div>
            <h1>Celestial Object</h1>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {configurations.map((config, index) => (
                    <div key={index} style={{ flex: "1" }}>
                        <CelestialSystem2 configurations={[config]} key={index} index={index + 1} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
