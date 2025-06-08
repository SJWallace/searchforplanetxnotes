import React from 'react';
import ObjectIcons from '../ObjectIcons';
import { RuleIcons } from '../RulesIcons';

export const normalResearchStepsConfig = [
    {
        options: [
            { label: 'Comet', img: <ObjectIcons.Comet />},
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

export const planetXResearchStepsConfig = [
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

export const ruleGenerationStepsConfig = [
    {
        // Step 1: Quantifier Selection
        options: [
            { label: 'NO', img: <RuleIcons.No /> },
            { label: 'AT LEAST', img: <RuleIcons.AtLeast /> },
            { label: 'ALL', img: <RuleIcons.All /> },
        ],
    },
    {
        // Step 2.1: Integer Input for "AT LEAST"
        options: [
            {
                label: 'Set Quantity',
                condition: (selections) => selections[0]?.label === 'AT LEAST', // Only show if "AT LEAST" is selected
            },
        ],
    },
    {
        // Step 2.2: Object Selection
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
                condition: (selections) => selections[3]?.label === 'WITHIN', // Only show if "WITHIN" is selected
            },
        ],
    },
    {
        // Step 5: Object 2 Selection (or "None" if not applicable)
        options: [
            { label: 'Comet', img: <ObjectIcons.Comet /> },
            { label: 'Asteroid', img: <ObjectIcons.Asteroid /> },
            { label: 'Dwarf Planet', img: <ObjectIcons.DwarfPlanet /> },
            { label: 'Gas Cloud', img: <ObjectIcons.GasCloud /> },
            { label: 'None', img: null },
        ],
    },
];