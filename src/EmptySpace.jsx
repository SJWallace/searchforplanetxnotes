import React from "react";
import CelestialObject from "./CelestialObject";
import emptySpaceImage from "./assets/empty_space.png"; // Replace with the correct path to your PNG

const EmptySpace = () => {
    return <CelestialObject image={emptySpaceImage} type="Empty Space" />;
};

export default EmptySpace;
