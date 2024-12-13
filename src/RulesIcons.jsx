// const CircleWithSegments = ({
//                                        numSegments = 12,
//                                        highlightedSegments = [],
//                                    }) => {
//     const radius = 30; // Radius of the circle
//     const center = 32; // Center point of the circle (for a 64x64 viewBox)
//
//     // Function to calculate the path for each segment
//     const calculateSegmentPath = (index) => {
//         const anglePerSegment = (2 * Math.PI) / numSegments; // Angle covered by each segment
//         const startAngle = index * anglePerSegment;
//         const endAngle = startAngle + anglePerSegment;
//
//         const startX = center + radius * Math.cos(startAngle);
//         const startY = center - radius * Math.sin(startAngle);
//         const endX = center + radius * Math.cos(endAngle);
//         const endY = center - radius * Math.sin(endAngle);
//
//         const largeArcFlag = anglePerSegment > Math.PI ? 1 : 0;
//
//         return `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`;
//     };
//
//     // Utility to get the color for a segment based on highlightedSegments
//     const getSegmentColor = (index) => {
//         const match = highlightedSegments.find((seg) => seg.index === index);
//         return match ? match.color : "white"; // Default to white if not highlighted
//     };
//
//     return (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="200" height="200">
//             {Array.from({ length: numSegments }).map((_, index) => (
//                 <path
//                     key={index}
//                     d={calculateSegmentPath(index)}
//                     fill={getSegmentColor(index)}
//                     stroke="black"
//                     strokeWidth={1}
//                 />
//             ))}
//         </svg>
//     );
// };

// // Adjacent Segments Component
// export const Adjacent = ({ baseIndex = 0 }) => {
//     const numSegments = 12; // Total number of segments
//
//     // Calculate adjacent segments
//     const highlightedSegments = [
//         { index: baseIndex, color: "black" }, // Base segment
//         { index: (baseIndex + 1) % numSegments, color: "lightgreen" }, // Next segment (clockwise)
//         { index: (baseIndex - 1 + numSegments) % numSegments, color: "lightgreen" }, // Previous segment (counter-clockwise)
//     ];
//
//     return <CircleWithSegments numSegments={numSegments} highlightedSegments={highlightedSegments} />;
// };

// // Opposite Segments Component
// export const Opposite = ({ baseIndex = 0 }) => {
//     const numSegments = 12; // Total number of segments
//
//     // Calculate opposite segment
//     const highlightedSegments = [
//         { index: baseIndex, color: "black" }, // Base segment
//         { index: (baseIndex + numSegments / 2) % numSegments, color: "lightgreen" }, // Opposite segment
//     ];
//
//     return <CircleWithSegments numSegments={numSegments} highlightedSegments={highlightedSegments} />;
// };

// // Segments Within N Distance Component
// export const WithinN = ({baseIndex = 0, distance = 2}) => {
//     const numSegments = 12; // Total number of segments
//
//     // Generate segments within N distance
//     const highlightedSegments = [
//         {index: baseIndex, color: "black"}, // Base segment
//         ...Array.from({length: 2 * distance + 1}, (_, i) => {
//             const index = (baseIndex - distance + i + numSegments) % numSegments; // Wrap around logic
//             return {index, color: "lightgreen"};
//         }).filter((seg) => seg.index !== baseIndex), // Exclude base index from lightgreen highlights
//     ];
//
//     return <CircleWithSegments numSegments={numSegments} highlightedSegments={highlightedSegments}/>;
// };
export const Adjacent = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <g id="adjacent-icon">
        <path d="M 32 32 L 62 32 A 30 30 0 0 0 57.98076211353316 17 Z" fill="black" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 57.98076211353316 17 A 30 30 0 0 0 47 6.019237886466843 Z" fill="yellow" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 47 6.019237886466843 A 30 30 0 0 0 32 2 Z" fill="white" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 32 2 A 30 30 0 0 0 17.000000000000007 6.01923788646684 Z" fill="white" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 17.000000000000007 6.01923788646684 A 30 30 0 0 0 6.019237886466847 16.99999999999999 Z"
              fill="white" stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 6.019237886466847 16.99999999999999 A 30 30 0 0 0 2 31.999999999999982 Z" fill="white"
              stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 2 31.999999999999996 A 30 30 0 0 0 6.019237886466836 46.99999999999999 Z" fill="white"
              stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 6.019237886466836 46.99999999999999 A 30 30 0 0 0 16.999999999999986 57.98076211353315 Z"
              fill="white" stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 16.999999999999986 57.98076211353315 A 30 30 0 0 0 31.999999999999993 62 Z" fill="white"
              stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 31.999999999999993 62 A 30 30 0 0 0 47 57.98076211353316 Z" fill="white" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 46.99999999999998 57.980762113533174 A 30 30 0 0 0 57.98076211353315 47.000000000000014 Z"
              fill="white" stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 57.98076211353315 47.000000000000014 A 30 30 0 0 0 62 32.00000000000001 Z" fill="yellow"
              stroke="black" strokeWidth="1"></path>
        </g>
    </svg>
)
export const Opposite = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <g id="opposite-icon">
            <path d="M 32 32 L 62 32 A 30 30 0 0 0 57.98076211353316 17 Z" fill="black" stroke="black"
                  strokeWidth="1"></path>
            <path d="M 32 32 L 57.98076211353316 17 A 30 30 0 0 0 47 6.019237886466843 Z" fill="white" stroke="black"
                  strokeWidth="1"></path>
            <path d="M 32 32 L 47 6.019237886466843 A 30 30 0 0 0 32 2 Z" fill="white" stroke="black"
                  strokeWidth="1"></path>
            <path d="M 32 32 L 32 2 A 30 30 0 0 0 17.000000000000007 6.01923788646684 Z" fill="white" stroke="black"
                  strokeWidth="1"></path>
            <path d="M 32 32 L 17.000000000000007 6.01923788646684 A 30 30 0 0 0 6.019237886466847 16.99999999999999 Z"
                  fill="white" stroke="black" strokeWidth="1"></path>
            <path d="M 32 32 L 6.019237886466847 16.99999999999999 A 30 30 0 0 0 2 31.999999999999982 Z" fill="white"
                  stroke="black" strokeWidth="1"></path>
            <path d="M 32 32 L 2 31.999999999999996 A 30 30 0 0 0 6.019237886466836 46.99999999999999 Z"
                  fill="yellow"
                  stroke="black" strokeWidth="1"></path>
            <path d="M 32 32 L 6.019237886466836 46.99999999999999 A 30 30 0 0 0 16.999999999999986 57.98076211353315 Z"
                  fill="white" stroke="black" strokeWidth="1"></path>
            <path d="M 32 32 L 16.999999999999986 57.98076211353315 A 30 30 0 0 0 31.999999999999993 62 Z" fill="white"
                  stroke="black" strokeWidth="1"></path>
            <path d="M 32 32 L 31.999999999999993 62 A 30 30 0 0 0 47 57.98076211353316 Z" fill="white" stroke="black"
                  strokeWidth="1"></path>
            <path d="M 32 32 L 46.99999999999998 57.980762113533174 A 30 30 0 0 0 57.98076211353315 47.000000000000014 Z"
                  fill="white" stroke="black" strokeWidth="1"></path>
            <path d="M 32 32 L 57.98076211353315 47.000000000000014 A 30 30 0 0 0 62 32.00000000000001 Z" fill="white"
                  stroke="black" strokeWidth="1"></path>
        </g>
    </svg>
);
export const WithinN = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <g id="within-n-icon">
        <path d="M 32 32 L 62 32 A 30 30 0 0 0 57.98076211353316 17 Z" fill="black" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 57.98076211353316 17 A 30 30 0 0 0 47 6.019237886466843 Z" fill="yellow" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 47 6.019237886466843 A 30 30 0 0 0 32 2 Z" fill="yellow" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 32 2 A 30 30 0 0 0 17.000000000000007 6.01923788646684 Z" fill="white" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 17.000000000000007 6.01923788646684 A 30 30 0 0 0 6.019237886466847 16.99999999999999 Z"
              fill="white" stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 6.019237886466847 16.99999999999999 A 30 30 0 0 0 2 31.999999999999982 Z" fill="white"
              stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 2 31.999999999999996 A 30 30 0 0 0 6.019237886466836 46.99999999999999 Z" fill="white"
              stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 6.019237886466836 46.99999999999999 A 30 30 0 0 0 16.999999999999986 57.98076211353315 Z"
              fill="white" stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 16.999999999999986 57.98076211353315 A 30 30 0 0 0 31.999999999999993 62 Z" fill="white"
              stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 31.999999999999993 62 A 30 30 0 0 0 47 57.98076211353316 Z" fill="white" stroke="black"
              strokeWidth="1"></path>
        <path d="M 32 32 L 46.99999999999998 57.980762113533174 A 30 30 0 0 0 57.98076211353315 47.000000000000014 Z"
              fill="yellow" stroke="black" strokeWidth="1"></path>
        <path d="M 32 32 L 57.98076211353315 47.000000000000014 A 30 30 0 0 0 62 32.00000000000001 Z" fill="yellow"
              stroke="black" strokeWidth="1"></path>
        </g>
    </svg>
)




// "No" Icon
export const No = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <g id="no-icon">
            <circle cx="32" cy="32" r="30" stroke="black" strokeWidth="4" fill="none"/>
            <text
                x="32"
                y="37"
                fontSize="20"
                textAnchor="middle"
                fill="black"
                fontFamily="Arial, sans-serif"
            >
                No
            </text>
        </g>
    </svg>
);

// "At Least" Icon
export const AtLeast = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <g id="at-least-icon">
            <circle cx="32" cy="32" r="30" stroke="black" strokeWidth="4" fill="none"/>
            <text
                x="32"
                y="37"
                fontSize="20"
                textAnchor="middle"
                fill="black"
                fontFamily="Arial, sans-serif"
            >
                2+
            </text>
        </g>
    </svg>
);

// "All" Icon
export const All = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <g id="all-icon">
            <circle cx="32" cy="32" r="30" stroke="black" strokeWidth="4" fill="none" />
            <text
                x="32"
                y="37"
                fontSize="20"
                textAnchor="middle"
                fill="black"
                fontFamily="Arial, sans-serif"
            >
                All
            </text>
        </g>
    </svg>
);

// Grouped Export
export const RuleIcons = {
    No,
    AtLeast,
    All,
    Adjacent,
    Opposite,
    WithinN,
};