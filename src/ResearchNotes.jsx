import React from 'react';
import useGameStore from './stores/gameStore';
import MultiStepObjectSelector from './MultiStepObjectSelector';
import { normalResearchStepsConfig, planetXResearchStepsConfig, ruleGenerationStepsConfig } from './config/researchConfig.jsx';
import ErrorBoundary from './ErrorBoundary';

const ResearchRow = ({ label }) => {
    const researchData = useGameStore(state => state.researchNotes[label]);
    const updateResearchNote = useGameStore(state => state.updateResearchNote);

    const handleObjectsChange = (selections) => {
        updateResearchNote(label, 'objects', selections);
    };

    const handleRulesChange = (selections) => {
        updateResearchNote(label, 'rules', selections);
    };

    // Determine which config to use based on the label
    const stepsConfig = label.startsWith('X') 
        ? planetXResearchStepsConfig 
        : normalResearchStepsConfig;

    return (
        <tr style={{ cursor: 'pointer', borderBottom: '1px solid gray' }}>
            <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>
                {label}
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>
                <ErrorBoundary fallback={<div>Error in Objects selector</div>}>
                    <MultiStepObjectSelector 
                        steps={stepsConfig} 
                        initialSelections={researchData.objects}
                        onSelectionsChange={handleObjectsChange}
                    />
                </ErrorBoundary>
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>
                <ErrorBoundary fallback={<div>Error in Rules selector</div>}>
                    <MultiStepObjectSelector 
                        steps={ruleGenerationStepsConfig} 
                        initialSelections={researchData.rules}
                        onSelectionsChange={handleRulesChange}
                    />
                </ErrorBoundary>
            </td>
        </tr>
    );
};

const ResearchNotes = () => {
    return (
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
                        <th style={{ padding: '10px', textAlign: 'left' }}>Rules</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Rows A through F */}
                    <ResearchRow label="A" />
                    <ResearchRow label="B" />
                    <ResearchRow label="C" />
                    <ResearchRow label="D" />
                    <ResearchRow label="E" />
                    <ResearchRow label="F" />

                    {/* Rows X1 and X2 */}
                    <ResearchRow label="X1" />
                    <ResearchRow label="X2" />
                </tbody>
            </table>
        </div>
    );
};

export default ResearchNotes;
