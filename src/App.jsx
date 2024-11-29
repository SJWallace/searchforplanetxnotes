import React from 'react';
import Starscape from './Starscape.jsx';

function App() {
    return (
        <div>
            <h1>Celestial Object</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <Starscape numberOfSystems={12} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} />
            </div>
        </div>
    );
}

export default App;
