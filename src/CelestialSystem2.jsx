import React from "react";
import Asteroid from "./Asteroid";
import Comet from "./Comet";
import DwarfPlanet from "./DwarfPlanet";
import EmptySpace from "./EmptySpace";
import GasCloud from "./GasCloud";
import PlanetX from "./PlanetX";

const CelestialSystem2 = ({ configurations, index }) => {
    const celestialComponents = [
        { name: "Comet", component: <Comet /> },
        { name: "Asteroid", component: <Asteroid /> },
        { name: "DwarfPlanet", component: <DwarfPlanet /> },
        { name: "GasCloud", component: <GasCloud /> },
        { name: "EmptySpace", component: <EmptySpace /> },
        { name: "PlanetX", component: <PlanetX /> }
    ];

    return (
        <div>
            {configurations.map((config, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column-reverse' }}> {/* Added flex-direction: column-reverse to show the first div at the relative outer edge of the circle */}
                    <div style={{ fontWeight: "bold" }}>Index: {index + i}</div>
                    <div style={{ display: "flex", flexDirection: "column-reverse"}}> {/* Added flex-direction: column-reverse to show the first div at the relative outer edge of the circle */}
                        {celestialComponents.map(({ name, component }, j) => (
                            <div key={j}>
                                {config.includes(name) ? component : <div style={{ minHeight: "2rem" }}></div>}
                            </div>
                        ))}
                        <div style={{ height: "4rem", width: "2rem" }}></div> {/* Keeps icons from overlapping at the center of the circle */}
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
