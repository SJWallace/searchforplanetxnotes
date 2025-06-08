import React from "react";
import CelestialObject from "./CelestialObject";
import dwarfPlanetImage from "./assets/dwarf_planet.png"; // Replace with your PNG path

const DwarfPlanet = ({ sectorId }) => {
    return <CelestialObject sectorId={sectorId} objectType="dwarfPlanet" image={dwarfPlanetImage} type="Dwarf Planet" />;
};

export default DwarfPlanet;
