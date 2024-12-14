import React from "react";
import Asteroid from "./Asteroid";
import Comet from "./Comet";
import DwarfPlanet from "./DwarfPlanet";
import EmptySpace from "./EmptySpace";
import GasCloud from "./GasCloud";
import PlanetX from "./PlanetX";
import CelestialSystem2 from "./CelestialSystem2";
import Circle from "./Circle";

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const Starscape = ({ numberOfSystems = 12 }) => {
    const configurations = Array.from({ length: numberOfSystems }, (_, i) => {
        const index = i + 1;
        const config = ["Asteroid", "DwarfPlanet", "GasCloud", "EmptySpace", "PlanetX"];
        if (isPrime(index)) {
            config.unshift("Comet");
        }
        return config;
    });

    // Create an array of system components
    const systems = configurations.map((config, index) => (
        <div 
            key={index} 
        >
            <CelestialSystem2 configurations={[config]} index={index + 1} />
        </div>
    ));

    return (
        <div style={{ 
            position: "relative",
            top:0,
            left:0,
            width: "100%",      
            height: "100%",    
            margin: "auto",     // Center the circle
            display: "flex",
        }}>
                    <Circle>
                        {systems}
                    </Circle>
        </div>
    );
};

export default Starscape;

// Example usage:
// <Starscape numberOfSystems={18} />

// This component will render a rectangular starscape of 12 or 18 systems, where each system contains all celestial elements, and only the systems with a prime number index include a comet.
