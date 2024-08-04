interface ArrowProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const Arrow = ({ startX, startY, endX, endY }: ArrowProps) => {
  const arrowHeadSize = 11;
  const angle = Math.atan2(endY - startY, endX - startX);
  const arrowX1 = endX - arrowHeadSize * Math.cos(angle - Math.PI / 6);
  const arrowY1 = endY - arrowHeadSize * Math.sin(angle - Math.PI / 6);
  const arrowX2 = endX - arrowHeadSize * Math.cos(angle + Math.PI / 6);
  const arrowY2 = endY - arrowHeadSize * Math.sin(angle + Math.PI / 6);
  
  const svgWidth = Math.max(startX, endX) + arrowHeadSize;
  const svgHeight = Math.max(startY, endY) + arrowHeadSize;

  return (
    <svg
    width={svgWidth}
    height={svgHeight}
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: '10' }}
    >
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke='gray'
        strokeWidth='2'
      />
      <line
        x1={endX}
        y1={endY}
        x2={arrowX1}
        y2={arrowY1}
        stroke='gray'
        strokeWidth='2'
      />
      <line
        x1={endX}
        y1={endY}
        x2={arrowX2}
        y2={arrowY2}
        stroke='gray'
        strokeWidth='2'
      />
    </svg>
  );
};

export default Arrow;
