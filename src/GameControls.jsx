import React from 'react';
import useGameStore from './stores/gameStore';

const GameControls = () => {
    // Use individual selectors for each state piece
    const undo = useGameStore(state => state.undo);
    const redo = useGameStore(state => state.redo);
    const resetGame = useGameStore(state => state.resetGame);
    const numberOfSectors = useGameStore(state => state.numberOfSectors);
    const gameMode = useGameStore(state => state.gameMode);
    const history = useGameStore(state => state.history);
    const historyIndex = useGameStore(state => state.historyIndex);
    
    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;
    
    return (
        <div style={{ display: 'flex', gap: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <button 
                onClick={undo} 
                disabled={!canUndo}
                style={{ 
                    padding: '5px 10px', 
                    opacity: canUndo ? 1 : 0.5,
                    cursor: canUndo ? 'pointer' : 'not-allowed'
                }}
            >
                Undo
            </button>
            
            <button 
                onClick={redo} 
                disabled={!canRedo}
                style={{ 
                    padding: '5px 10px', 
                    opacity: canRedo ? 1 : 0.5,
                    cursor: canRedo ? 'pointer' : 'not-allowed'
                }}
            >
                Redo
            </button>
            
            <div style={{ flex: 1 }}></div>
            
            <select 
                value={gameMode}
                onChange={(e) => {
                    const newMode = e.target.value;
                    const sectors = newMode === 'expert' ? 18 : 12;
                    resetGame(sectors);
                }}
                style={{ padding: '5px 10px' }}
            >
                <option value="standard">Standard (12 sectors)</option>
                <option value="expert">Expert (18 sectors)</option>
            </select>
            
            <button 
                onClick={() => {
                    if (window.confirm('Are you sure you want to reset the game? All progress will be lost.')) {
                        resetGame(numberOfSectors);
                    }
                }}
                style={{ padding: '5px 10px', backgroundColor: '#ff6b6b', color: 'white' }}
            >
                Reset Game
            </button>
        </div>
    );
};

export default GameControls;