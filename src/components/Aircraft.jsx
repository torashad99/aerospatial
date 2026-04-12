import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TYPE_COLORS } from '../utils.js';

export default function Aircraft({ data, currentPosition, altitudeRange, isConflict, isSelected, onSelect }) {
  const [altMin, altMax] = altitudeRange;
  const isFiltered = currentPosition[1] < altMin || currentPosition[1] > altMax;

  const baseColor = TYPE_COLORS[data.type] || '#ffffff';
  const color     = isConflict ? '#ff4444' : baseColor;
  const opacity   = isFiltered ? 0.1 : 1;

  // Orient cone tip in heading direction.
  // Uses Euler order 'YXZ' so the matrix is Ry(h) * Rx(π/2):
  //   1. Rx(π/2): tip from +Y → +Z (north)
  //   2. Ry(h):   tip sweeps to (sin(h), 0, cos(h)) — matches utils.js leader line convention.
  // Default 'XYZ' order would remap local-Y to world-Z after the X rotation (gimbal),
  // causing the heading sweep to rotate in the wrong plane.
  const headingRad = (data.heading * Math.PI) / 180;

  const flDisplay = `FL${String(Math.round(currentPosition[1] * 10)).padStart(3, '0')}`;

  return (
    <group position={currentPosition}>
      <mesh
        rotation={new THREE.Euler(Math.PI / 2, headingRad, 0, 'YXZ')}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
      >
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
        <div className={`data-block${isConflict ? ' conflict' : ''}${isSelected ? ' selected' : ''}`}>
          <div className="callsign">{data.id}</div>
          <div className="details">{flDisplay} {data.speed}kts</div>
        </div>
      </Html>
    </group>
  );
}
