import React, { useState } from 'react';
import Starscape from './Starscape.jsx';

// Updated ObjectIcons to use image paths
import cometImage from './assets/comet.png';
import asteroidImage from './assets/asteroid.png';
import dwarfPlanetImage from './assets/dwarf_planet.png';
import gasCloudImage from './assets/gas_cloud.png';
import planetXImage from './assets/planet_x.png';

// Placeholder components for GameLog and ResearchNotes
const GameLog = () => (
    <div style={{ border: '1px solid black', padding: '10px', height: '100%' }}>
        <h2>Game Log</h2>
        <p>Details about game events will be shown here.</p>
    </div>
);

const ObjectIcons = {
    comets: cometImage, // Image representing comets
    asteroids: asteroidImage, // Image representing asteroids
    dwarfPlanets: dwarfPlanetImage, // Image representing dwarf planets
    gasClouds: gasCloudImage, // Image representing gas clouds
    planetX: planetXImage, // Image representing Planet X
};

const ObjectSelector = () => {
    const [showIcons, setShowIcons] = useState(false); // Controls visibility of the first icons menu
    const [selectedObject, setSelectedObject] = useState(null); // Tracks the first selected object
    const [showSecondIcons, setShowSecondIcons] = useState(false); // Controls visibility of the second icons menu
    const [selectedSecondObject, setSelectedSecondObject] = useState(null); // Tracks the second selected object

    const toggleIconsVisibility = () => {
        setShowIcons((prev) => !prev);
    };

    const handleObjectSelect = (objectType) => {
        setSelectedObject(objectType); // Update the first selected object
        setShowIcons(false); // Close the first dropdown
        setShowSecondIcons(true); // Show the second dropdown
    };

    const handleSecondObjectSelect = (objectType) => {
        if (objectType === 'none') {
            setSelectedSecondObject(null); // Clear second selection
        } else {
            setSelectedSecondObject(objectType); // Update the second selected object
        }
        setShowSecondIcons(false); // Close the second dropdown
    };

    // Filter the available options for the second dropdown
    const filteredObjectIcons = Object.entries(ObjectIcons).filter(
        ([objectType]) => objectType !== selectedObject
    );

    return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* First Object Selector */}
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
                {/* Display the currently selected image or placeholder */}
                {selectedObject ? (
                    <img
                        src={ObjectIcons[selectedObject]}
                        alt={selectedObject}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                ) : (
                    'Click'
                )}
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
                        {Object.entries(ObjectIcons).map(([objectType, imgSrc]) => (
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
                                <img
                                    src={imgSrc}
                                    alt={objectType}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        objectFit: 'contain',
                                        marginBottom: '5px', // Spaces the image from the label
                                    }}
                                />
                                <span style={{ fontSize: '12px', color: 'black' }}>{objectType}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Second Object Selector */}
            {selectedObject && (
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
                    onClick={() => setShowSecondIcons((prev) => !prev)}
                >
                    {/* Display the second selected image or placeholder */}
                    {selectedSecondObject ? (
                        <img
                            src={ObjectIcons[selectedSecondObject]}
                            alt={selectedSecondObject}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    ) : selectedSecondObject === null ? (
                        'None'
                    ) : (
                        'Click'
                    )}
                    {showSecondIcons && (
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
                            {/* Add the "none" option */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '5px 0', // Adds spacing between the menu items
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent parent click from triggering toggle
                                    handleSecondObjectSelect('none');
                                }}
                            >
                                <div style={{ fontSize: '24px' }}>❌</div>
                                <span style={{ fontSize: '12px', color: 'black' }}>None</span>
                            </div>
                            {/* Display filtered options for the second dropdown */}
                            {filteredObjectIcons.map(([objectType, imgSrc]) => (
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
                                        handleSecondObjectSelect(objectType);
                                    }}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={objectType}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            objectFit: 'contain',
                                            marginBottom: '5px', // Spaces the image from the label
                                        }}
                                    />
                                    <span style={{ fontSize: '12px', color: 'black' }}>{objectType}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const ResearchRow = ({ label, rule, text, onClick }) => (
    <tr
        onClick={onClick}
        style={{ cursor: 'pointer', borderBottom: '1px solid gray' }}
    >
        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>
            {label}
        </td>

        {/* Only ObjectSelector in the Classes Section */}
        <td style={{ padding: '10px', textAlign: 'left' }}>
            <ObjectSelector />
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
                <th style={{ padding: '10px', textAlign: 'left' }}>Classes</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Rule</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Notes</th>
            </tr>
            </thead>
            <tbody>
            <ResearchRow
                label="A"
                rule="Example Rule A"
                text="Freeform notes for A"
                onClick={() => {}}
            />
            <ResearchRow
                label="B"
                rule="Example Rule B"
                text="Freeform notes for B"
                onClick={() => {}}
            />
            <ResearchRow
                label="C"
                rule="Example Rule C"
                text="Freeform notes for C"
                onClick={() => {}}
            />
            <ResearchRow
                label="D"
                rule="Example Rule D"
                text="Freeform notes for D"
                onClick={() => {}}
            />
            <ResearchRow
                label="E"
                rule="Example Rule E"
                text="Freeform notes for E"
                onClick={() => {}}
            />
            <ResearchRow
                label="F"
                rule="Example Rule F"
                text="Freeform notes for F"
                onClick={() => {}}
            />
            <ResearchRow
                label="X1"
                rule="Example Rule X1"
                text="Freeform notes for X1"
                onClick={() => {}}
            />
            <ResearchRow
                label="X2"
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