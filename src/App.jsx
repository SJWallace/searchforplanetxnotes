import React, { useState } from 'react';
import Starscape from './Starscape.jsx';

// Placeholder components for GameLog and ResearchNotes
const GameLog = () => (
    <div style={{ border: '1px solid black', padding: '10px', height: '100%' }}>
        <h2>Game Log</h2>
        <p>Details about game events will be shown here.</p>
    </div>
);

// Icon placeholders
const ObjectIcons = {
    comets: '☄️', // Icon representing comets
    asteroids: '🪨', // Icon representing asteroids
    dwarfPlanets: '🔵', // Icon representing dwarf planets
    gasClouds: '☁️', // Icon representing gas clouds
};

const ObjectSelector = () => {
    const [showIcons, setShowIcons] = useState(false); // Controls visibility of the icons menu
    const [selectedObject, setSelectedObject] = useState(null); // Tracks the last selected object

    const toggleIconsVisibility = () => {
        setShowIcons((prev) => !prev);
    };

    const handleObjectSelect = (objectType) => {
        setSelectedObject(objectType); // Update the selected object
        setShowIcons(false); // Close the dropdown after the selection
    };

    return (
        <div
            style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                cursor: 'pointer',
            }}
            onClick={toggleIconsVisibility}
        >
            <span style={{ fontSize: '24px', color: 'black' }}>
                {selectedObject ? ObjectIcons[selectedObject] : 'Click'}
            </span>
            {showIcons && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%', // Align dropdown directly below the component
                        left: 0,
                        display: 'flex',
                        flexDirection: 'column', // Makes the icons menu vertical
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        zIndex: 100, // Ensures the dropdown is on top of other elements
                    }}
                >
                    {Object.entries(ObjectIcons).map(([objectType, icon]) => (
                        <div
                            key={objectType}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                padding: '5px 0', // Adds spacing between the menu items
                            }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent parent click from triggering toggle
                                handleObjectSelect(objectType);
                            }}
                        >
                            <div style={{ fontSize: '24px' }}>{icon}</div>
                            <span style={{ fontSize: '12px', color: 'black' }}>{objectType}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ResearchRow = ({ label, classes, rule, text, onClick }) => (
    <tr onClick={onClick} style={{ cursor: 'pointer', borderBottom: '1px solid gray' }}>
        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>{label}</td>
        <td style={{ padding: '10px', textAlign: 'left' }}>
            <div>{classes[0]}</div>
            {classes[1] && <div>{classes[1]}</div>}
        </td>
        <td style={{ padding: '10px', textAlign: 'left' }}>{rule}</td>
        <td style={{ padding: '10px', textAlign: 'left' }}>{text}</td>
    </tr>
);



const ResearchNotes = () => (
    <div style={{ border: '1px solid black', padding: '10px', height: '100%', overflowY: 'auto' }}>
        <h2>Research Notes</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid black' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Research</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Classes</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Rule</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Notes</th>
                </tr>
            </thead>
            <tbody>
                <ResearchRow
                    label="A"
                    classes={["Class 1", "Class 2"]}
                    rule="Example Rule A"
                    text="Freeform notes for A"
                    onClick={() => {}}
                />
                <ResearchRow
                    label="B"
                    classes={["Class 1"]}
                    rule="Example Rule B"
                    text="Freeform notes for B"
                    onClick={() => {}}
                />
                <ResearchRow
                    label="C"
                    classes={["Class 2", "Class 3"]}
                    rule="Example Rule C"
                    text="Freeform notes for C"
                    onClick={() => {}}
                />
                <ResearchRow
                    label="D"
                    classes={["Class 1"]}
                    rule="Example Rule D"
                    text="Freeform notes for D"
                    onClick={() => {}}
                />
                <ResearchRow
                    label="E"
                    classes={["Class 2"]}
                    rule="Example Rule E"
                    text="Freeform notes for E"
                    onClick={() => {}}
                />
                <ResearchRow
                    label="F"
                    classes={["Class 3", "Class 4"]}
                    rule="Example Rule F"
                    text="Freeform notes for F"
                    onClick={() => {}}
                />
                <ResearchRow
                    label="X1"
                    classes={["Class 1", "Class 2"]}
                    rule="Example Rule X1"
                    text="Freeform notes for X1"
                    onClick={() => {}}
                />
                <ResearchRow
                    label="X2"
                    classes={["Class 3"]}
                    rule="Example Rule X2"
                    text="Freeform notes for X2"
                    onClick={() => {}}
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
                    <ObjectSelector />
                </div>
                <div style={{ flex: 1 }}>
                    <ResearchNotes />
                </div>
            </div>
        </div>
    );
}

export default App;