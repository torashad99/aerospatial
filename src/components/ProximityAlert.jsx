import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ProximityAlert({ midpoint, visible }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Pulse opacity between 0.1 and 0.2
    meshRef.current.material.opacity =
      0.1 + 0.1 * Math.sin(clock.elapsedTime * 2);
  });

  if (!visible) return null;

  return (
    <mesh ref={meshRef} position={midpoint}>
      <cylinderGeometry args={[1.5, 1.5, 1, 16]} />
      <meshStandardMaterial
        color="#ff4444"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </mesh>
  );
}
