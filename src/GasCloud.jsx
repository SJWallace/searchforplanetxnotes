import React from "react";
import CelestialObject from "./CelestialObject";
import gasCloudImage from "./assets/gas_cloud.png"; // Replace with the correct path to your PNG

const GasCloud = () => {
    return <CelestialObject image={gasCloudImage} type="Gas Cloud" />;
};

export default GasCloud;
