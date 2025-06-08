import React from "react";
import CelestialObject from "./CelestialObject";
import planetXImage from "./assets/planet_x.png"; // Replace with the correct path to your PNG

const PlanetX = ({ sectorId }) => {
    return <CelestialObject sectorId={sectorId} objectType="planetX" image={planetXImage} type="Planet X" />;
};

export default PlanetX;
