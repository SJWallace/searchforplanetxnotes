import React from "react";
import Asteroid from "./Asteroid";
import Comet from "./Comet";
import DwarfPlanet from "./DwarfPlanet";
import EmptySpace from "./EmptySpace";
import GasCloud from "./GasCloud";
import PlanetX from "./PlanetX";
import CelestialSystem2 from "./CelestialSystem2";

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

    return (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${numberOfSystems}, 1fr)`, gap: "5px", borderRight: "1px solid black" }}>
            {configurations.map((config, index) => (
                <div key={index} style={{ borderLeft: index > 0 ? "1px solid black" : "none", display: "flex", flexDirection: "column", alignItems: "center", padding: "5px 0" }}>
                    <CelestialSystem2 configurations={[config]} index={index + 1} />
                </div>
            ))}
        </div>
    );
};

export default Starscape;

// Example usage:
// <Starscape numberOfSystems={18} />

// This component will render a rectangular starscape of 12 or 18 systems, where each system contains all celestial elements, and only the systems with a prime number index include a comet.
