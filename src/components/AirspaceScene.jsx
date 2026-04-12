import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { computePosition } from '../utils.js';
import { useConflictDetection } from '../hooks/useConflictDetection.js';
import Aircraft from './Aircraft.jsx';
import LeaderLine from './LeaderLine.jsx';
import ProximityAlert from './ProximityAlert.jsx';
import AltitudeSlice from './AltitudeSlice.jsx';
import CameraController from './CameraController.jsx';

function Scene({ aircraftData, cameraMode, altitudeRange, playbackSpeed, selectedAircraftId, onSelectAircraft }) {
  const simTimeRef   = useRef(0);
  const lastFrameRef = useRef(null);
  const lastTickRef  = useRef(0);
  const [currentPositions, setCurrentPositions] = useState(
    () => aircraftData.map(a => [...a.position])
  );

  // Reset positions when scenario changes (aircraftData identity changes)
  useEffect(() => {
    setCurrentPositions(aircraftData.map(a => [...a.position]));
    simTimeRef.current   = 0;
    lastFrameRef.current = null;
  }, [aircraftData]);

  useFrame(({ clock }) => {
    // Accumulate simulated time at full frame rate
    if (lastFrameRef.current === null) lastFrameRef.current = clock.elapsedTime;
    const delta = clock.elapsedTime - lastFrameRef.current;
    lastFrameRef.current = clock.elapsedTime;
    simTimeRef.current += delta * playbackSpeed;

    // Throttle React state updates to ~20fps to balance smoothness and React overhead
    if (clock.elapsedTime - lastTickRef.current < 0.05) return;
    lastTickRef.current = clock.elapsedTime;

    setCurrentPositions(aircraftData.map(a => computePosition(a, simTimeRef.current)));
  });

  const { conflictIds, conflictPairs } = useConflictDetection(
    aircraftData, currentPositions, altitudeRange
  );

  const focusTarget = selectedAircraftId
    ? currentPositions[aircraftData.findIndex(a => a.id === selectedAircraftId)] || null
    : null;

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      <gridHelper args={[60, 60, '#1a1a3a', '#1a1a3a']} />

      {/* Compass labels at grid edges */}
      {[
        { label: 'N', position: [0, 0, 33] },
        { label: 'S', position: [0, 0, -33] },
        { label: 'E', position: [33, 0, 0] },
        { label: 'W', position: [-33, 0, 0] },
      ].map(({ label, position }) => (
        <Html key={label} position={position} center>
          <div className="compass-label">{label}</div>
        </Html>
      ))}

      {aircraftData.map((aircraft, i) => (
        <Aircraft
          key={aircraft.id}
          data={aircraft}
          currentPosition={currentPositions[i]}
          altitudeRange={altitudeRange}
          isConflict={conflictIds.has(aircraft.id)}
          isSelected={aircraft.id === selectedAircraftId}
          onSelect={() => onSelectAircraft(aircraft.id)}
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

      <CameraController cameraMode={cameraMode} focusTarget={focusTarget} />
    </>
  );
}

export default function AirspaceScene({ aircraftData, cameraMode, altitudeRange, playbackSpeed, selectedAircraftId, onSelectAircraft }) {
  return (
    <Canvas
      style={{ background: '#121228' }}
      camera={{ position: [40, 30, 40], fov: 60 }}
    >
      <Scene
        aircraftData={aircraftData}
        cameraMode={cameraMode}
        altitudeRange={altitudeRange}
        playbackSpeed={playbackSpeed}
        selectedAircraftId={selectedAircraftId}
        onSelectAircraft={onSelectAircraft}
      />
    </Canvas>
  );
}
