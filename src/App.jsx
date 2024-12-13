import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Starscape from './Starscape.jsx';
import ObjectIcons from './ObjectIcons'; // Assuming ObjectIcons is exported from a module

// Placeholder components for GameLog and ResearchNotes
const GameLog = () => (
    <div style={{ border: '1px solid black', padding: '10px', height: '100%' }}>
        <h2>Game Log</h2>
        <p>Details about game events will be shown here.</p>
    </div>
);

const normalResearchStepsConfig = [
    {
        options: [
            { label: 'Comet', img: ObjectIcons.Comet },
            { label: 'Asteroid', img: ObjectIcons.Asteroid },
            { label: 'Dwarf Planet', img: ObjectIcons.DwarfPlanet },
            { label: 'Gas Cloud', img: ObjectIcons.GasCloud },
        ],
    },
    {
        options: [
            { label: 'Comet', img: ObjectIcons.Comet, condition: (selections) => selections[0]?.label !== 'Comet' },
            { label: 'Asteroid', img: ObjectIcons.Asteroid, condition: (selections) => selections[0]?.label !== 'Asteroid' },
            { label: 'Dwarf Planet', img: ObjectIcons.DwarfPlanet, condition: (selections) => selections[0]?.label !== 'Dwarf Planet' },
            { label: 'Gas Cloud', img: ObjectIcons.GasCloud, condition: (selections) => selections[0]?.label !== 'Gas Cloud' },
            { label: 'None', img: null }, // Always available as an option in the second step
        ],
    },
];

const planetXResearchStepsConfig = [
    {
        options: [
            { label: 'Planet X', img: ObjectIcons.PlanetX },
        ],
    },
    {
        options: [
            { label: 'Comet', img: ObjectIcons.Comet, condition: (selections) => selections[0]?.label !== 'Comet' },
            { label: 'Asteroid', img: ObjectIcons.Asteroid, condition: (selections) => selections[0]?.label !== 'Asteroid' },
            { label: 'Dwarf Planet', img: ObjectIcons.DwarfPlanet, condition: (selections) => selections[0]?.label !== 'Dwarf Planet' },
            { label: 'Gas Cloud', img: ObjectIcons.GasCloud, condition: (selections) => selections[0]?.label !== 'Gas Cloud' },
            { label: 'None', img: null }, // Always available as an option in the second step
        ],
    },
];


const MultiStepObjectSelector = ({ steps }) => {

MultiStepObjectSelector.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    img: PropTypes.any,
                    condition: PropTypes.func,
                })
            ).isRequired,
        })
    ).isRequired,
};
    const [selections, setSelections] = useState(Array(steps.length).fill(null)); // Array to track selections
    const [visibleIndex, setVisibleIndex] = useState(-1); // No dropdown visible initially
    const dropdownRef = useRef(null); // Reference to track the currently opened dropdown

    useEffect(() => {
        if (steps[0]?.options.length === 1) {
            const firstOption = steps[0].options[0];
            handleSelect(0, firstOption); // Select the only available option
        }
    }, [steps]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (visibleIndex !== -1 && !selections[visibleIndex]) {
                    const newSelections = [...selections];
                    newSelections[visibleIndex] = { label: "None", img: null };
                    setSelections(newSelections);
                }
                setVisibleIndex(-1); // Close the dropdown
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visibleIndex, selections]);

    const handleSelect = (stepIndex, option) => {
        const newSelections = [...selections];
        newSelections[stepIndex] = option;

        for (let i = stepIndex + 1; i < newSelections.length; i++) {
            newSelections[i] = null;
        }
        setSelections(newSelections);

        if (option.label !== "None" && stepIndex < steps.length - 1) {
            setVisibleIndex(stepIndex + 1); // Display the next dropdown
        } else {
            setVisibleIndex(-1); // Hide dropdowns if "None" is selected or last step
        }
    };

    const handleStepClick = (stepIndex) => {
        if (steps[stepIndex]?.options.length === 1) {
            const singleOption = steps[stepIndex].options[0];
            handleSelect(stepIndex, singleOption);
            return;
        }
        setVisibleIndex((prevIndex) => (prevIndex === stepIndex ? -1 : stepIndex));
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            {steps.map((step, stepIndex) => {
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
                            width: '64px',
                            height: '64px',
                            backgroundColor: selections[stepIndex] ? 'transparent' : 'lightgray',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleStepClick(stepIndex)}
                    >
                        {selections[stepIndex] ? (
                            <img
                                src={selections[stepIndex].img}
                                alt={selections[stepIndex].label}
                                // Reduced size for the displayed icon
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            'Click'
                        )}

                        {stepIndex === visibleIndex && (
                            <div
                                ref={dropdownRef}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'white',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                    zIndex: 999,
                                }}
                            >
                                {step.options
                                    .filter((option) => !option.condition || option.condition(selections))
                                    .map((option) => (
                                        <div
                                            key={option.label}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                padding: '5px 0',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelect(stepIndex, option);
                                            }}
                                        >
                                            {option.img && (
                                                <img
                                                    src={option.img}
                                                    alt={option.label}
                                                    // Reduced size for the dropdown icons
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        objectFit: 'contain',
                                                        marginBottom: '5px',
                                                    }}
                                                />
                                            )}
                                            <span style={{ fontSize: '12px', color: 'black' }}>{option.label}</span>
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
                    <h1>Multi-Step Object Selector</h1>
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