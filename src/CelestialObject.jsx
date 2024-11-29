import React, { useState } from "react";

const CelestialObject = ({ image, type, size = "64px" }) => {
    const [state, setState] = useState("neutral");

    const handleClick = () => {
        setState((prevState) => {
            if (prevState === "neutral") return "confirmed";
            if (prevState === "confirmed") return "eliminated";
            return "neutral";
        });
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
                alt={type}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: state === "neutral" ? "grayscale(100%)" : "none", // Gray for neutral
                    boxSizing: "border-box"
                }}
            />

            {/* Confirmed (Green Circle) */}
            {state === "confirmed" && (
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
            {state === "eliminated" && (
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
