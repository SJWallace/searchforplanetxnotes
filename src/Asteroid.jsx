import React from "react";
import CelestialObject from "./CelestialObject";
import asteroidImage from "./assets/asteroid.png"; // Replace with your PNG path

const Asteroid = ({ sectorId }) => {
    return <CelestialObject sectorId={sectorId} objectType="asteroid" image={asteroidImage} type="Asteroid" />;
};

export default Asteroid;
