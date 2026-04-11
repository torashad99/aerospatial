import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const CAMERA_3D = new THREE.Vector3(40, 30, 40);
const CAMERA_2D = new THREE.Vector3(0, 100, 0);
const LERP_SPEED = 3;
const ARRIVE_THRESHOLD = 0.1; // units — stop overriding controls when this close

export default function CameraController({ cameraMode }) {
  const { camera } = useThree();
  const controlsRef    = useRef();
  const targetPosRef   = useRef(CAMERA_3D.clone());
  const isTransitioning = useRef(false);

  useEffect(() => {
    targetPosRef.current = (cameraMode === '3d' ? CAMERA_3D : CAMERA_2D).clone();
    isTransitioning.current = true;
    // Reset controls target to scene center at transition start
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [cameraMode]);

  useFrame((_, delta) => {
    if (!isTransitioning.current) return;

    camera.position.lerp(targetPosRef.current, Math.min(1, LERP_SPEED * delta));
    camera.lookAt(0, 0, 0);

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }

    // Stop overriding controls once camera arrives at target
    if (camera.position.distanceTo(targetPosRef.current) < ARRIVE_THRESHOLD) {
      isTransitioning.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableRotate={cameraMode === '3d'}
      enablePan
      enableZoom
      enableDamping
      dampingFactor={0.05}
    />
  );
}
