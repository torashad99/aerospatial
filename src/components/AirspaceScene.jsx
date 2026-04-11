import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { computePosition } from '../utils.js';
import { useConflictDetection } from '../hooks/useConflictDetection.js';
import Aircraft from './Aircraft.jsx';
import LeaderLine from './LeaderLine.jsx';
import ProximityAlert from './ProximityAlert.jsx';
import AltitudeSlice from './AltitudeSlice.jsx';
import CameraController from './CameraController.jsx';

function Scene({ aircraftData, cameraMode, altitudeRange }) {
  const startTimeRef = useRef(null);
  const lastTickRef  = useRef(0);
  const [currentPositions, setCurrentPositions] = useState(
    () => aircraftData.map(a => [...a.position])
  );

  // Reset positions when scenario changes (aircraftData identity changes)
  useEffect(() => {
    setCurrentPositions(aircraftData.map(a => [...a.position]));
    startTimeRef.current = null;
  }, [aircraftData]);

  useFrame(({ clock }) => {
    if (startTimeRef.current === null) startTimeRef.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - startTimeRef.current;

    // Throttle React state updates to ~20fps to balance smoothness and React overhead
    if (clock.elapsedTime - lastTickRef.current < 0.05) return;
    lastTickRef.current = clock.elapsedTime;

    setCurrentPositions(aircraftData.map(a => computePosition(a, elapsed)));
  });

  const { conflictIds, conflictPairs } = useConflictDetection(
    aircraftData, currentPositions, altitudeRange
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      <gridHelper args={[60, 60, '#1a1a3a', '#1a1a3a']} />

      {aircraftData.map((aircraft, i) => (
        <Aircraft
          key={aircraft.id}
          data={aircraft}
          currentPosition={currentPositions[i]}
          altitudeRange={altitudeRange}
          isConflict={conflictIds.has(aircraft.id)}
        />
      ))}

      {aircraftData.map((aircraft, i) => (
        <LeaderLine
          key={`leader-${aircraft.id}`}
          data={aircraft}
          currentPosition={currentPositions[i]}
          altitudeRange={altitudeRange}
          isConflict={conflictIds.has(aircraft.id)}
        />
      ))}

      {cameraMode === '3d' && conflictPairs.map((pair, i) => (
        <ProximityAlert key={i} midpoint={pair.midpoint} />
      ))}

      <AltitudeSlice altitudeRange={altitudeRange} visible={cameraMode === '3d'} />

      <CameraController cameraMode={cameraMode} />
    </>
  );
}

export default function AirspaceScene({ aircraftData, cameraMode, altitudeRange }) {
  return (
    <Canvas
      style={{ background: '#0a0a1a' }}
      camera={{ position: [40, 30, 40], fov: 60 }}
    >
      <Scene
        aircraftData={aircraftData}
        cameraMode={cameraMode}
        altitudeRange={altitudeRange}
      />
    </Canvas>
  );
}
