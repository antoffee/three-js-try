import React from 'react';
import { Canvas } from '@react-three/fiber';

import { CustomCanvasProps } from './CustomCanvas.types';

export const CustomCanvas = ({ camera, ...props }: CustomCanvasProps) => {
    return <Canvas camera={camera ?? { position: [0, 0, 0], fov: 15 }} {...props} />;
};
