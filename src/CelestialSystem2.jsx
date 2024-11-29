import React from "react";
import Asteroid from "./Asteroid";
import Comet from "./Comet";
import DwarfPlanet from "./DwarfPlanet";
import EmptySpace from "./EmptySpace";
import GasCloud from "./GasCloud";
import PlanetX from "./PlanetX";

const CelestialSystem2 = ({ configurations, index }) => {
    const celestialComponents = [
        { name: "Asteroid", component: <Asteroid /> },
        { name: "Comet", component: <Comet /> },
        { name: "DwarfPlanet", component: <DwarfPlanet /> },
        { name: "EmptySpace", component: <EmptySpace /> },
        { name: "GasCloud", component: <GasCloud /> },
        { name: "PlanetX", component: <PlanetX /> }
    ];

    return (
        <div>
            {configurations.map((config, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Index: {index + i}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {celestialComponents.map(({ name, component }, j) => (
                            <div key={j} style={{ margin: "5px 0", padding: 0, height: "64px", width: "64px", boxSizing: "border-box" }}>
                                {config.includes(name) ? component : <div style={{ height: "64px", width: "64px" }}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
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
