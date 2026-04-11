import { Html } from '@react-three/drei';
import { TYPE_COLORS } from '../utils.js';

export default function Aircraft({ data, currentPosition, altitudeRange, isConflict }) {
  const [altMin, altMax] = altitudeRange;
  const isFiltered = currentPosition[1] < altMin || currentPosition[1] > altMax;

  const baseColor = TYPE_COLORS[data.type] || '#ffffff';
  const color     = isConflict ? '#ff4444' : baseColor;
  const opacity   = isFiltered ? 0.1 : 1;

  // Orient cone tip in heading direction.
  // Three.js cone default: tip points up (+Y).
  // Rotate -90° around X → tip points in +Z (north when heading=0).
  // Rotate -heading around Y → tip points in heading direction.
  const rotX = -Math.PI / 2;
  const rotY = -(data.heading * Math.PI) / 180;

  const flDisplay = `FL${String(Math.round(currentPosition[1] * 10)).padStart(3, '0')}`;

  return (
    <group position={currentPosition}>
      <mesh rotation={[rotX, rotY, 0]}>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={opacity}
        />
      </mesh>

      <Html
        distanceFactor={20}
        style={{ opacity: isFiltered ? 0.1 : 1, transition: 'opacity 0.3s' }}
      >
        <div className={`data-block${isConflict ? ' conflict' : ''}`}>
          <div className="callsign">{data.id}</div>
          <div className="details">{flDisplay} {data.speed}kts</div>
        </div>
      </Html>
    </group>
  );
}
