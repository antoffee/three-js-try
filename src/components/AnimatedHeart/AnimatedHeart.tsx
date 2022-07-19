import React, { Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import Heart from 'models/Heart';

export const AnimatedHeart = () => {
    const meshRef = React.useRef<THREE.Mesh | null>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.scale.x = Math.abs(Math.sin(clock.getElapsedTime() * 2)) + 0.5;
            meshRef.current.scale.y = Math.abs(Math.sin(clock.getElapsedTime() * 2)) + 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <Suspense fallback={null}>
                <Heart />
            </Suspense>
        </mesh>
    );
};
