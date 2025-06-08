import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Extract common styles as constants
const styles = {
  button: {
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    background: "#f0f0f0",
    border: "1px solid #ccc"
  },
  input: {
    width: "50px",
    textAlign: "center",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  selectorContainer: {
    display: "flex",
    gap: "10px"
  },
  selectorCell: {
    width: "64px",
    height: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    fontSize: "14px",
  },
  iconWrapper: {
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    textAlign: "center"
  },
  iconContainer: {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 999,
  },
  dropdownItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    padding: "5px 0",
    backgroundColor: "transparent",
    transition: "background-color 0.3s",
  },
  smallIconContainer: {
    width: "24px",
    height: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5px",
  },
  optionLabel: {
    fontSize: "12px"
  }
};

// Separate NumberDropdown component
const NumberDropdown = ({ value, onChange }) => {
    const handleDecrease = () => {
        onChange(Math.max(0, (value || 0) - 1));
    };

    const handleIncrease = () => {
        onChange((value || 0) + 1);
    };

    return (
        <div style={styles.flexContainer}>
            <button onClick={handleDecrease} style={styles.button}>-</button>
            <input
                type="number"
                value={value || 0}
                onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
                style={styles.input}
            />
            <button onClick={handleIncrease} style={styles.button}>+</button>
        </div>
    );
};

NumberDropdown.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

const MultiStepObjectSelector = ({ steps, initialSelections = [], onSelectionsChange }) => {
    const [selections, setSelections] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(-1);
    const dropdownRef = useRef(null);

    // Initialize selections
    useEffect(() => {
        if (steps && steps.length) {
            const defaultSelections = initialSelections && initialSelections.length 
                ? [...initialSelections]
                : Array(steps.length).fill(null);
            setSelections(defaultSelections);
        }
    }, [steps, initialSelections]);

    const handleSelect = (stepIndex, option) => {
        if (!option) return;
        if (stepIndex < 0 || stepIndex >= selections.length) return;

        const newSelections = [...selections];
        newSelections[stepIndex] = option;

        // Special case for "WITHIN" relationship
        if (stepIndex === 3) {
            if (option.label === "WITHIN") {
                // Clear selections after step 4 but preserve step 4 (distance)
                for (let i = stepIndex + 1; i < newSelections.length; i++) {
                    if (i !== 4) newSelections[i] = null;
                }
            } else {
                // Clear distance (step 4) if not "WITHIN"
                newSelections[4] = null;
            }
        }

        setSelections(newSelections);

        if (onSelectionsChange) {
            onSelectionsChange(newSelections);
        }

        // Adjust visible dropdown
        setVisibleIndex(stepIndex < steps.length - 1 ? stepIndex + 1 : -1);
    };

    const handleNumberChange = (stepIndex, value) => {
        if (stepIndex < 0 || stepIndex >= selections.length) return;

        const newSelections = [...selections];
        newSelections[stepIndex] = { 
            ...newSelections[stepIndex] || {}, 
            label: value 
        };

        setSelections(newSelections);

        if (onSelectionsChange) {
            onSelectionsChange(newSelections);
        }
    };

    // Handle clicks outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setVisibleIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Ensure steps exists and is an array before mapping
    if (!steps || !Array.isArray(steps)) {
        return <div>Invalid steps configuration</div>;
    }

    return (
        <div style={styles.selectorContainer}>
            {steps.map((step, stepIndex) => {
                // Check if step should be hidden
                const isHidden =
                    stepIndex !== 0 &&
                    (selections[stepIndex]?.label === "None" || 
                     steps.some((_, prevIndex) => 
                        prevIndex < stepIndex && 
                        selections[prevIndex]?.label === "None"
                     ));

                if (isHidden) return null;

                // Render selector cell
                return (
                    <div
                        key={stepIndex}
                        style={{
                            ...styles.selectorCell,
                            backgroundColor: selections[stepIndex] ? "transparent" : "lightgray",
                        }}
                        onClick={() => setVisibleIndex(prevIndex => 
                            prevIndex === stepIndex ? -1 : stepIndex
                        )}
                    >
                        {/* Display selection or "Click" text */}
                        {selections[stepIndex]?.label ? (
                            <div style={styles.iconWrapper}>
                                {selections[stepIndex]?.img ? (
                                    <div style={styles.iconContainer}>
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

                        {/* Dropdown menu */}
                        {stepIndex === visibleIndex && step && step.options && (
                            <div ref={dropdownRef} style={styles.dropdownContainer}>
                                {step.options
                                    .filter(option => !option.condition || option.condition(selections))
                                    .map(option => (
                                        <div
                                            key={option.label}
                                            style={styles.dropdownItem}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                                            onClick={e => {
                                                e.stopPropagation();

                                                // Handle special cases for quantity/distance options
                                                const isSpecialOption = 
                                                    option.label === "Set Quantity" || 
                                                    option.label === "Set Distance";

                                                if (!isSpecialOption) {
                                                    handleSelect(stepIndex, option);
                                                }
                                            }}
                                        >
                                            {/* Show icon */}
                                            <div style={styles.smallIconContainer}>
                                                {option.img}
                                            </div>

                                            {/* Show label */}
                                            <span style={styles.optionLabel}>{option.label}</span>

                                            {/* Show number controls for special options */}
                                            {(option.label === "Set Quantity" || option.label === "Set Distance") && (
                                                <NumberDropdown
                                                    value={parseInt(selections[stepIndex]?.label || 0, 10)}
                                                    onChange={value => handleNumberChange(stepIndex, value)}
                                                />
                                            )}
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
