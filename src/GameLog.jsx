import React from 'react';
import useGameStore from './stores/gameStore';

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};

const formatAction = (action) => {
    switch (action.type) {
        case 'confirm':
            return `Confirmed ${action.objectType} in sector ${action.sectorId}`;
        case 'research':
            return `Updated research ${action.key} (${action.dataType})`;
        case 'undo':
            return 'Undid last action';
        case 'redo':
            return 'Redid action';
        case 'reset':
            return 'Reset game';
        default:
            return 'Unknown action';
    }
};

const GameLog = () => {
    const actionLog = useGameStore(state => state.actionLog);
    
    return (
        <div style={{ border: '1px solid black', padding: '10px', height: '100%', overflowY: 'auto' }}>
            <h2>Game Log</h2>
            {actionLog.length === 0 ? (
                <p>No actions recorded yet.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {actionLog.slice().reverse().map((action, index) => (
                        <li 
                            key={index} 
                            style={{ 
                                padding: '5px 0', 
                                borderBottom: index < actionLog.length - 1 ? '1px solid #eee' : 'none' 
                            }}
                        >
                            <div style={{ fontWeight: 'bold' }}>{formatAction(action)}</div>
                            <div style={{ fontSize: '0.8em', color: '#666' }}>{formatTimestamp(action.timestamp)}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GameLog;