import React from "react";
import CelestialObject from "./CelestialObject";
import asteroidImage from "./assets/asteroid.png"; // Replace with your PNG path

const Asteroid = () => {
    return <CelestialObject image={asteroidImage} type="Asteroid" />;
};

export default Asteroid;
