import React from 'react';
import './App.css';
import Starscape from './Starscape';
import GameLog from './GameLog';
import ResearchNotes from './ResearchNotes';
import GameControls from './GameControls';


function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <GameControls />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Left Side: Celestial Object */}
                <div style={{ flex: 1, borderRight: '2px solid gray', padding: '10px', overflowY: 'auto' }}>
                    <h1>Celestial Objects</h1>
                    <Starscape />
                </div>

                {/* Right Side: Split into GameLog (top) and ResearchNotes (bottom) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
                    <div style={{ flex: 1, marginBottom: '10px', overflowY: 'auto' }}>
                        <GameLog />
                    </div>
                    <div style={{ flex: 2, overflowY: 'auto' }}>
                        <ResearchNotes />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
