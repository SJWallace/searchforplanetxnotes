import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const NumberDropdown = ({ value, onChange }) => {
    const handleDecrease = () => {
        // Ensure the value doesn't go negative
        onChange(Math.max(0, (value || 0) - 1));
    };

    const handleIncrease = () => {
        onChange((value || 0) + 1);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Decrement button */}
            <button
                onClick={handleDecrease}
                style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    background: "#f0f0f0",
                    border: "1px solid #ccc"
                }}
            >
                -
            </button>

            {/* Input field for direct number entry */}
            <input
                type="number"
                value={value || 0}
                onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
                style={{
                    width: "50px",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />

            {/* Increment button */}
            <button
                onClick={handleIncrease}
                style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    background: "#f0f0f0",
                    border: "1px solid #ccc"
                }}
            >
                +
            </button>
        </div>
    );
};

NumberDropdown.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

const MultiStepObjectSelector = ({ steps, initialSelections = [], onSelectionsChange }) => {
    const [selections, setSelections] = useState(initialSelections.length ? initialSelections : Array(steps.length).fill(null)); // Track selections
    const [visibleIndex, setVisibleIndex] = useState(-1); // Track which dropdown is open
    const dropdownRef = useRef();

    // Initialize with initialSelections if provided
    useEffect(() => {
        if (initialSelections.length && JSON.stringify(selections) !== JSON.stringify(initialSelections)) {
            setSelections(initialSelections);
        }
    }, [initialSelections]);

    const handleSelect = (stepIndex, option) => {
        // Create a new copy of the selections state
        const newSelections = [...selections];
        newSelections[stepIndex] = option;

        // Special case for "WITHIN" to manage dependencies on "Set Distance" (step 4)
        if (stepIndex === 3 && option.label !== "WITHIN") {
            // Clear distance input (step 4) if the relationship is not "WITHIN"
            newSelections[4] = null;
        }

        // Clear invalid selections for dependent steps (but allow out-of-order selection)
        if (stepIndex === 3 && option.label === "WITHIN") {
            // Ensure "Set Distance" step is preserved when "WITHIN" is selected
            for (let i = stepIndex + 1; i < newSelections.length; i++) {
                if (i !== 4) newSelections[i] = null;
            }
        }

        // Update the shared state of MultiStepObjectSelector
        setSelections(newSelections);
        
        // Notify parent component of the change
        if (onSelectionsChange) {
            onSelectionsChange(newSelections);
        }

        // Adjust the visible dropdown — move to the next step if in order, else close
        setVisibleIndex(stepIndex < steps.length - 1 ? stepIndex + 1 : -1);
    };

    // Handles number changes (distance/quantity selection)
    const handleNumberChange = (stepIndex, value) => {
        const newSelections = [...selections];
        newSelections[stepIndex] = { ...newSelections[stepIndex], label: value }; // Update with the selected number
        setSelections(newSelections);
        
        // Notify parent component of the change
        if (onSelectionsChange) {
            onSelectionsChange(newSelections);
        }
    };

    // Utility to close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setVisibleIndex(-1); // Close dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {/* Loop through each step */}
            {steps.map((step, stepIndex) => {
                const isHidden =
                    stepIndex !== 0 &&
                    (selections[stepIndex]?.label === "None" || steps.some((prevStep, prevIndex) => prevIndex < stepIndex && selections[prevIndex]?.label === "None"));

                if (isHidden) return null;

                return (
                    <div
                        key={stepIndex}
                        style={{
                            width: "64px",
                            height: "64px",
                            backgroundColor: selections[stepIndex] ? "transparent" : "lightgray",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        onClick={() => setVisibleIndex((prevIndex) => (prevIndex === stepIndex ? -1 : stepIndex))}
                    >
                        {/* Display the icon scaled to 40px, or the label only if no icon exists */}
                        {selections[stepIndex]?.label ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                {/* Render icon only if it exists */}
                                {selections[stepIndex]?.img ? (
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {React.cloneElement(selections[stepIndex]?.img, {
                                            style: { width: "100%", height: "100%" },
                                        })}
                                    </div>
                                ) : (
                                    <span>{selections[stepIndex]?.label}</span>
                                )}
                            </div>
                        ) : (
                            "Click"
                        )}

                        {/* Render dropdown options */}
                        {stepIndex === visibleIndex && (
                            <div
                                ref={dropdownRef}
                                style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)", // Add some spacing between the parent and dropdown (if needed)
                                    left: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "white",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                    zIndex: 999,
                                }}
                            >
                                {step.options
                                    .filter((option) => !option.condition || option.condition(selections))
                                    .map((option) => (
                                        <div
                                            key={option.label}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                cursor: "pointer",
                                                padding: "5px 0",
                                                backgroundColor: "transparent", // Default background
                                                transition: "background-color 0.3s", // Smooth hover effect
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")} // Highlight on hover
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")} // Reset on mouse leave
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (option.label !== "Set Quantity" && option.label !== "Set Distance") {
                                                    handleSelect(stepIndex, option);
                                                }
                                            }}
                                        >
                                            {/* Show icon and label */}
                                            <div
                                                style={{
                                                    width: "24px",
                                                    height: "24px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                {option.img}
                                            </div>
                                            <span style={{fontSize: "12px"}}>{option.label}</span>

                                            {/* Render NumberDropdown if required */}
                                            {option.label === "Set Quantity" || option.label === "Set Distance" ? (
                                                <NumberDropdown
                                                    value={parseInt(selections[stepIndex]?.label || 0, 10)}
                                                    onChange={(value) => handleNumberChange(stepIndex, value)}
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// PropTypes validation
MultiStepObjectSelector.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    img: PropTypes.node,
                    condition: PropTypes.func,
                })
            ).isRequired,
        })
    ).isRequired,
    initialSelections: PropTypes.array,
    onSelectionsChange: PropTypes.func,
};

export default MultiStepObjectSelector;