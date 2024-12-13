import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Starscape from './Starscape.jsx';
import ObjectIcons from './ObjectIcons'; // Assuming ObjectIcons is exported from a module
import { RuleIcons } from "./RulesIcons.jsx";

// Placeholder components for GameLog and ResearchNotes
const GameLog = () => (
    <div style={{border: '1px solid black', padding: '10px', height: '100%'}}>
        <h2>Game Log</h2>
        <h1>Multi-Step Object Selector</h1>
        <MultiStepObjectSelector steps={ruleGenerationStepsConfig}/>
        <p>Details about game events will be shown here.</p>
    </div>
);

const normalResearchStepsConfig = [
    {
        options: [
            {label: 'Comet', img: <ObjectIcons.Comet/>},
            { label: 'Asteroid', img: <ObjectIcons.Asteroid />},
            { label: 'Dwarf Planet', img: <ObjectIcons.DwarfPlanet />},
            { label: 'Gas Cloud', img: <ObjectIcons.GasCloud /> },
        ],
    },
    {
        options: [
            { label: 'Comet', img: <ObjectIcons.Comet />, condition: (selections) => selections[0]?.label !== 'Comet' },
            { label: 'Asteroid', img: <ObjectIcons.Asteroid />, condition: (selections) => selections[0]?.label !== 'Asteroid' },
            { label: 'Dwarf Planet', img: <ObjectIcons.DwarfPlanet />, condition: (selections) => selections[0]?.label !== 'Dwarf Planet' },
            { label: 'Gas Cloud', img: <ObjectIcons.GasCloud />, condition: (selections) => selections[0]?.label !== 'Gas Cloud' },
            { label: 'None', img: null }, // Always available as an option in the second step
        ],
    },
];

const planetXResearchStepsConfig = [
    {
        options: [
            { label: 'Planet X', img: <ObjectIcons.PlanetX /> },
        ],
    },
    {
        options: [
            { label: 'Comet', img: <ObjectIcons.Comet />, condition: (selections) => selections[0]?.label !== 'Comet' },
            { label: 'Asteroid', img: <ObjectIcons.Asteroid />, condition: (selections) => selections[0]?.label !== 'Asteroid' },
            { label: 'Dwarf Planet', img: <ObjectIcons.DwarfPlanet />, condition: (selections) => selections[0]?.label !== 'Dwarf Planet' },
            { label: 'Gas Cloud', img: <ObjectIcons.GasCloud />, condition: (selections) => selections[0]?.label !== 'Gas Cloud' },
            { label: 'None', img: null }, // Always available as an option in the second step
        ],
    },
];

const ruleGenerationStepsConfig = [
    {
        // Step 1: Quantifier Selection
        options: [
            { label: 'NO', img: <RuleIcons.No />},
            { label: 'AT LEAST', img: <RuleIcons.AtLeast /> },
            { label: 'ALL', img: <RuleIcons.All /> },
        ],
    },
    {
        // Step 2: Object 1 Selection
        options: [
            { label: 'Comet', img: <ObjectIcons.Comet /> },
            { label: 'Asteroid', img: <ObjectIcons.Asteroid /> },
            { label: 'Dwarf Planet', img: <ObjectIcons.DwarfPlanet /> },
            { label: 'Gas Cloud', img: <ObjectIcons.GasCloud /> },
        ],
    },
    {
        // Step 3: Relationship Selection
        options: [
            { label: 'ADJACENT', img: <RuleIcons.Adjacent /> },
            { label: 'OPPOSITE', img: <RuleIcons.Opposite /> },
            { label: 'WITHIN', img: <RuleIcons.WithinN /> },
        ],
    },
    {
        // Step 4: Distance (N) Input (only applicable if "WITHIN" is selected)
        options: [
            {
                label: 'Set Distance',
                img: RuleIcons.Within,
                condition: (selections) => selections[2]?.label === 'WITHIN', // Only show if "WITHIN" is selected
            },
        ],
    },
    {
        // Step 5: Object 2 Selection (or "None" if not applicable)
        options: [
            { label: 'Comet', img: <ObjectIcons.Comet /> },
            { label: 'Asteroid', img: <ObjectIcons.Asteroid />},
            { label: 'Dwarf Planet', img: <ObjectIcons.DwarfPlanet /> },
            { label: 'Gas Cloud', img: <ObjectIcons.GasCloud /> },
            { label: 'None', img: null },
        ],
    },
];


const MultiStepObjectSelector = ({ steps }) => {
    const [selections, setSelections] = useState(Array(steps.length).fill(null)); // Track selections
    const [visibleIndex, setVisibleIndex] = useState(-1); // Initially, no dropdown is visible
    const dropdownRef = useRef(null); // Ref for dropdown

    // Automatically select the only option if a step has only one
    useEffect(() => {
        if (steps[0]?.options.length === 1) {
            const firstOption = steps[0].options[0];
            handleSelect(0, firstOption);
        }
    }, [steps]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (visibleIndex !== -1 && !selections[visibleIndex]) {
                    const newSelections = [...selections];
                    newSelections[visibleIndex] = { label: "None", img: null };
                    setSelections(newSelections);
                }
                setVisibleIndex(-1); // Close dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [visibleIndex, selections]);

    // Handle option selection
    const handleSelect = (stepIndex, option) => {
        const newSelections = [...selections];
        newSelections[stepIndex] = option;

        // Clear selections for the next steps
        for (let i = stepIndex + 1; i < newSelections.length; i++) {
            newSelections[i] = null;
        }
        setSelections(newSelections);

        // Move to the next dropdown or close it
        if (option.label !== "None" && stepIndex < steps.length - 1) {
            setVisibleIndex(stepIndex + 1);
        } else {
            setVisibleIndex(-1);
        }
    };

    // Show or hide dropdowns
    const handleStepClick = (stepIndex) => {
        if (steps[stepIndex]?.options.length === 1) {
            const singleOption = steps[stepIndex].options[0];
            handleSelect(stepIndex, singleOption);
            return;
        }
        setVisibleIndex((prevIndex) => (prevIndex === stepIndex ? -1 : stepIndex));
    };

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {steps.map((step, stepIndex) => {
                // Check if the current step should be displayed
                const isHidden =
                    stepIndex !== 0 &&
                    (selections[stepIndex]?.label === "None" ||
                        steps.some(
                            (prevStep, prevIndex) =>
                                prevIndex < stepIndex &&
                                selections[prevIndex]?.label === "None"
                        ));

                if (isHidden) {
                    return null;
                }

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
                        }}
                        onClick={() => handleStepClick(stepIndex)}
                    >
                        {/* Render selected icon, or show "Click" */}
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
                                {selections[stepIndex].img}
                            </div>
                        ) : (
                            "Click"
                        )}

                        {/* Dropdown for the current step */}
                        {stepIndex === visibleIndex && (
                            <div
                                ref={dropdownRef}
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "white",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                    zIndex: 999,
                                }}
                            >
                                {/* Render options */}
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
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelect(stepIndex, option);
                                            }}
                                        >
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
                                            <span
                                                style={{
                                                    fontSize: "12px",
                                                    color: "black",
                                                }}
                                            >
                                                {option.label}
                                            </span>
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
};

const ResearchRow = ({ label, rule, text, onClick, steps }) => (
    <tr
        onClick={onClick}
        style={{ cursor: 'pointer', borderBottom: '1px solid gray' }}
    >
        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>
            {label}
        </td>

        {/* Use MultiStepObjectSelector with configurable steps */}
        <td style={{ padding: '10px', textAlign: 'left' }}>
            <MultiStepObjectSelector steps={steps} />
        </td>

        <td style={{ padding: '10px', textAlign: 'left' }}>{rule}</td>
        <td style={{ padding: '10px', textAlign: 'left' }}>{text}</td>
    </tr>
);



const ResearchNotes = () => (
    <div
        style={{
            border: '1px solid black',
            padding: '10px',
            height: '100%',
            overflowY: 'auto',
        }}
    >
        <h2>Research Notes</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr
                style={{
                    backgroundColor: '#f0f0f0',
                    borderBottom: '2px solid black',
                }}
            >
                <th style={{ padding: '10px', textAlign: 'left' }}>Research</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Objects</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Rule</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Notes</th>
            </tr>
            </thead>
            <tbody>
            {/* Rows A through F use normalResearchStepsConfig */}
            <ResearchRow
                label="A"
                rule="Example Rule A"
                text="Freeform notes for A"
                steps={normalResearchStepsConfig}
            />
            <ResearchRow
                label="B"
                rule="Example Rule B"
                text="Freeform notes for B"
                steps={normalResearchStepsConfig}
            />
            <ResearchRow
                label="C"
                rule="Example Rule C"
                text="Freeform notes for C"
                steps={normalResearchStepsConfig}
            />
            <ResearchRow
                label="D"
                rule="Example Rule D"
                text="Freeform notes for D"
                steps={normalResearchStepsConfig}
            />
            <ResearchRow
                label="E"
                rule="Example Rule E"
                text="Freeform notes for E"
                steps={normalResearchStepsConfig}
            />
            <ResearchRow
                label="F"
                rule="Example Rule F"
                text="Freeform notes for F"
                steps={normalResearchStepsConfig}
            />

            {/* Rows X1 and X2 use planetXResearchStepsConfig */}
            <ResearchRow
                label="X1"
                rule="Example Rule X1"
                text="Freeform notes for X1"
                steps={planetXResearchStepsConfig}
            />
            <ResearchRow
                label="X2"
                rule="Example Rule X2"
                text="Freeform notes for X2"
                steps={planetXResearchStepsConfig}
            />
            </tbody>
        </table>
    </div>
);


function App() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Left Side: Celestial Object */}
            <div style={{ flex: 1, borderRight: '2px solid gray', padding: '10px' }}>
                <h1>Celestial Object</h1>
                <Starscape numberOfSystems={12} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} />
            </div>

            {/* Right Side: Split into GameLog (top) and ResearchNotes (bottom) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
                <div style={{ flex: 1, marginBottom: '10px' }}>
                    <GameLog />
                </div>
                <div style={{ flex: 1 }}>
                    <ResearchNotes />
                </div>
            </div>
        </div>
    );
}

export default App;