import React from "react";
import CelestialSystem2 from "./CelestialSystem2";
import useGameStore from "./stores/gameStore";

const Starscape = () => {
    const numberOfSectors = useGameStore(state => state.numberOfSectors);

    return (
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: `repeat(${numberOfSectors}, 1fr)`, 
            gap: "5px", 
            borderRight: "1px solid black" 
        }}>
            {Array.from({ length: numberOfSectors }, (_, index) => (
                <div 
                    key={index} 
                    style={{ 
                        borderLeft: index > 0 ? "1px solid black" : "none", 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        padding: "5px 0" 
                    }}
                >
                    <CelestialSystem2 sectorId={index + 1} />
                </div>
            ))}
        </div>
    );
};

export default Starscape;

// Example usage:
// <Starscape numberOfSystems={18} />

// This component will render a rectangular starscape of 12 or 18 systems, where each system contains all celestial elements, and only the systems with a prime number index include a comet.
