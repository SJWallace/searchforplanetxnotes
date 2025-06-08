import React from "react";
import useGameStore from "./stores/gameStore";

const CelestialObject = ({ sectorId, objectType, image, size = "64px" }) => {
    const objectState = useGameStore(
        state => state.sectors[sectorId - 1]?.possibleObjects[objectType]
    );
    const updateObjectState = useGameStore(state => state.updateObjectState);

    const handleClick = () => {
        let newState;
        if (objectState === "neutral") newState = "confirmed";
        else if (objectState === "confirmed") newState = "eliminated";
        else newState = "neutral";

        updateObjectState(sectorId, objectType, newState);
    };

    return (
        <div
            onClick={handleClick}
            style={{
                position: "relative",
                width: "64px",
                height: "64px",
                cursor: "pointer",
                display: "inline-block",
                boxSizing: "border-box"
            }}
        >
            {/* Base image */}
            <img
                src={image}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: objectState === "neutral" ? "grayscale(100%)" : "none", // Gray for neutral
                    boxSizing: "border-box"
                }}
            />

            {/* Confirmed (Green Circle) */}
            {objectState === "confirmed" && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "5px solid green",
                        borderRadius: "50%",
                        boxSizing: "border-box",
                        pointerEvents: "none",
                    }}
                ></div>
            )}

            {/* Eliminated (Red X) */}
            {objectState === "eliminated" && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        pointerEvents: "none",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                    >
                        <line
                            x1="4"
                            y1="4"
                            x2="20"
                            y2="20"
                            stroke="red"
                            strokeWidth="3"
                        />
                        <line
                            x1="20"
                            y1="4"
                            x2="4"
                            y2="20"
                            stroke="red"
                            strokeWidth="3"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default CelestialObject;
