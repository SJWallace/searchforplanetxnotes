import React from "react";
import CelestialObject from "./CelestialObject";
import cometImage from "./assets/comet.png"; // Replace with your PNG path

const Comet = ({ sectorId }) => {
    return <CelestialObject sectorId={sectorId} objectType="comet" image={cometImage} type="Comet" />;
};

export default Comet;
