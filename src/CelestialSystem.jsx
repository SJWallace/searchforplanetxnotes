import React from "react";
import Asteroid from "./Asteroid";
import Comet from "./Comet";
import DwarfPlanet from "./DwarfPlanet";
import EmptySpace from "./EmptySpace";
import GasCloud from "./GasCloud";
import PlanetX from "./PlanetX";

const CelestialSystem = () => {
    return (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Asteroid />
            <Comet />
            <DwarfPlanet />
            <EmptySpace />
            <GasCloud />
            <PlanetX />
        </div>
    );
};

export default CelestialSystem;