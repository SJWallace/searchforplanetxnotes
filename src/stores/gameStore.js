import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useGameStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        // Game configuration
        numberOfSectors: 12, // or 18 for expert mode
        gameMode: 'standard', // or 'expert'
        
        // Game state
        sectors: Array(12).fill().map((_, index) => ({
          id: index + 1,
          possibleObjects: {
            comet: 'neutral',
            asteroid: 'neutral',
            dwarfPlanet: 'neutral',
            gasCloud: 'neutral',
            emptySpace: 'neutral',
            planetX: 'neutral'
          },
          confirmedObject: null,
        })),
        
        // Research notes
        researchNotes: {
          A: { objects: [], rules: [] },
          B: { objects: [], rules: [] },
          C: { objects: [], rules: [] },
          D: { objects: [], rules: [] },
          E: { objects: [], rules: [] },
          F: { objects: [], rules: [] },
          X1: { objects: [], rules: [] },
          X2: { objects: [], rules: [] },
        },
        
        // Game log
        actionLog: [],
        
        // History for undo/redo functionality
        history: [],
        historyIndex: -1,
        
        // Actions
        updateObjectState: (sectorId, objectType, newState) => 
          set(state => {
            state.sectors[sectorId - 1].possibleObjects[objectType] = newState;
            
            // If confirming an object, eliminate all others in this sector
            if (newState === 'confirmed') {
              state.sectors[sectorId - 1].confirmedObject = objectType;
              Object.keys(state.sectors[sectorId - 1].possibleObjects)
                .filter(type => type !== objectType)
                .forEach(type => {
                  state.sectors[sectorId - 1].possibleObjects[type] = 'eliminated';
                });
              
              // Add to action log
              state.actionLog.push({
                type: 'confirm',
                sectorId,
                objectType,
                timestamp: new Date().toISOString()
              });
            }
            
            // Save state to history for undo/redo
            const newHistory = [
              ...state.history.slice(0, state.historyIndex + 1),
              JSON.parse(JSON.stringify({
                sectors: state.sectors,
                researchNotes: state.researchNotes
              }))
            ];
            state.history = newHistory;
            state.historyIndex = newHistory.length - 1;
          }),
          
        updateResearchNote: (key, type, data) =>
          set(state => {
            state.researchNotes[key][type] = data;
            state.actionLog.push({
              type: 'research',
              key,
              dataType: type,
              data,
              timestamp: new Date().toISOString()
            });
            
            // Save state to history
            const newHistory = [
              ...state.history.slice(0, state.historyIndex + 1),
              JSON.parse(JSON.stringify({
                sectors: state.sectors,
                researchNotes: state.researchNotes
              }))
            ];
            state.history = newHistory;
            state.historyIndex = newHistory.length - 1;
          }),
          
        // Undo/Redo functionality
        undo: () => 
          set(state => {
            if (state.historyIndex > 0) {
              state.historyIndex--;
              const previousState = state.history[state.historyIndex];
              state.sectors = previousState.sectors;
              state.researchNotes = previousState.researchNotes;
              state.actionLog.push({
                type: 'undo',
                timestamp: new Date().toISOString()
              });
            }
          }),
          
        redo: () => 
          set(state => {
            if (state.historyIndex < state.history.length - 1) {
              state.historyIndex++;
              const nextState = state.history[state.historyIndex];
              state.sectors = nextState.sectors;
              state.researchNotes = nextState.researchNotes;
              state.actionLog.push({
                type: 'redo',
                timestamp: new Date().toISOString()
              });
            }
          }),
          
        // Reset game
        resetGame: (numberOfSectors = 12) => 
          set(state => {
            state.numberOfSectors = numberOfSectors;
            state.sectors = Array(numberOfSectors).fill().map((_, index) => ({
              id: index + 1,
              possibleObjects: {
                comet: 'neutral',
                asteroid: 'neutral',
                dwarfPlanet: 'neutral',
                gasCloud: 'neutral',
                emptySpace: 'neutral',
                planetX: 'neutral'
              },
              confirmedObject: null,
            }));
            state.researchNotes = {
              A: { objects: [], rules: [] },
              B: { objects: [], rules: [] },
              C: { objects: [], rules: [] },
              D: { objects: [], rules: [] },
              E: { objects: [], rules: [] },
              F: { objects: [], rules: [] },
              X1: { objects: [], rules: [] },
              X2: { objects: [], rules: [] },
            };
            state.actionLog = [{
              type: 'reset',
              timestamp: new Date().toISOString()
            }];
            state.history = [JSON.parse(JSON.stringify({
              sectors: state.sectors,
              researchNotes: state.researchNotes
            }))];
            state.historyIndex = 0;
          }),
      })),
      {
        name: 'planet-x-game-storage',
        // Optionally exclude large parts of state from persistence
        partialize: (state) => ({
          numberOfSectors: state.numberOfSectors,
          gameMode: state.gameMode,
          sectors: state.sectors,
          researchNotes: state.researchNotes,
        }),
      }
    )
  )
)

export default useGameStore;