export default function AltitudeSlice({ altitudeRange, visible }) {
  if (!visible) return null;

  const [altMin, altMax] = altitudeRange;

  return (
    <>
      {/* Bottom slice plane at altMin */}
      <mesh position={[0, altMin, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.07}
          side={2}
          depthWrite={false}
        />
      </mesh>

      {/* Top slice plane at altMax */}
      <mesh position={[0, altMax, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.07}
          side={2}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
