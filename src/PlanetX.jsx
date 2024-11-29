import React from "react";
import CelestialObject from "./CelestialObject";
import planetXImage from "./assets/planet_x.png"; // Replace with the correct path to your PNG

const PlanetX = () => {
    return <CelestialObject image={planetXImage} type="Planet X" />;
};

export default PlanetX;
