import React from 'react';

const Circle = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const segments = Array(12).fill(null).map((_, index) => childrenArray[index] || null);
  
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      aspectRatio: '1 / 1' 
    }}>
      {segments.map((child, index) => {
        return (
          <div key={index}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '45%',
                height: '1px',
                // background: '#ccc', /* For debugging */
                transformOrigin: '0 0',
                transform: `rotate(${index * 30}deg)`,
              }}
            >
                {child}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Circle;


// Example usage:
// <Circle radius={100}>
// NOTE: flex-direction: column-reverse to show the first div at the outer edge of the circle
// <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>Two 
// <div>1</div>
// <div>2</div>
// <div>3</div>
// <div>4</div>
// <div>5</div>
// <div>6</div>
// <div>7</div>
// <div>8</div>
// <div>9</div>
// <div>10</div>
// NOTE: height: '50px' to keep icons from overlapping at the center of the circle
// <div style={{ height: '50px' }}></div> 
// </div>
// <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>One
// <div>1</div>
// <div>2</div>
// <div>3</div>
// <div>4</div>
// <div>5</div>
// <div>6</div>
// <div>7</div>
// <div>8</div>
// <div>9</div>
// <div>10</div>
// NOTE: height: '50px' to keep icons from overlapping at the center of the circle
// <div style={{ height: '50px' }}></div> 
// </div>
// </Circle>
