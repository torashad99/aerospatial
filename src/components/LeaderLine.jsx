import { Line } from '@react-three/drei';
import { computeLeaderEnd, TYPE_COLORS } from '../utils.js';

export default function LeaderLine({ data, currentPosition, altitudeRange, isConflict }) {
  const [altMin, altMax] = altitudeRange;
  const isFiltered = currentPosition[1] < altMin || currentPosition[1] > altMax;

  if (isFiltered) return null;

  const endPosition = computeLeaderEnd(data, currentPosition);
  const baseColor   = TYPE_COLORS[data.type] || '#ffffff';
  const color       = isConflict ? '#ff4444' : baseColor;
  const opacity     = isConflict ? 1.0 : 0.4;

  return (
    <Line
      points={[currentPosition, endPosition]}
      color={color}
      lineWidth={1.5}
      dashed
      dashScale={5}
      dashSize={0.4}
      gapSize={0.25}
      transparent
      opacity={opacity}
    />
  );
}
