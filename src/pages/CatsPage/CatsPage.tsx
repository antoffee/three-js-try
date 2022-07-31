import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { GrayCat } from 'components/GrayCat';

export const CatsPage = () => {
    return (
        <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [20, -100, 50], fov: 15 }}>
            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />
            <GrayCat />
            <OrbitControls />
        </Canvas>
    );
};
