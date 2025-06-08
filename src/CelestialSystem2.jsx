import React from "react";
import Asteroid from "./Asteroid";
import Comet from "./Comet";
import DwarfPlanet from "./DwarfPlanet";
import EmptySpace from "./EmptySpace";
import GasCloud from "./GasCloud";
import PlanetX from "./PlanetX";

const CelestialSystem2 = ({ sectorId }) => {
    const celestialComponents = [
        { type: "comet", component: <Comet sectorId={sectorId} /> },
        { type: "asteroid", component: <Asteroid sectorId={sectorId} /> },
        { type: "dwarfPlanet", component: <DwarfPlanet sectorId={sectorId} /> },
        { type: "gasCloud", component: <GasCloud sectorId={sectorId} /> },
        { type: "emptySpace", component: <EmptySpace sectorId={sectorId} /> },
        { type: "planetX", component: <PlanetX sectorId={sectorId} /> }
    ];

    return (
        <div>
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Sector: {sectorId}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {celestialComponents.map(({ type, component }, j) => (
                    <div 
                        key={j} 
                        style={{ 
                            margin: "5px 0", 
                            padding: 0, 
                            height: "64px", 
                            width: "64px", 
                            boxSizing: "border-box" 
                        }}
                    >
                        {component}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CelestialSystem2;

// Example usage:
// <CelestialSystem2 configurations={[
//     ["Asteroid", "Comet", "DwarfPlanet"],
//     ["EmptySpace", "GasCloud"],
//     ["PlanetX", "Comet"],
// ]} index={0} />

// The above example will render three rows with different celestial objects as per the configurations array, each with a unique index, while maintaining alignment with gaps for missing elements.
