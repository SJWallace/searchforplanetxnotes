import React from "react";
import CelestialObject from "./CelestialObject";
import dwarfPlanetImage from "./assets/dwarf_planet.png"; // Replace with your PNG path

const DwarfPlanet = () => {
    return <CelestialObject image={dwarfPlanetImage} type="DwarfPlanet" />;
};

export default DwarfPlanet;
