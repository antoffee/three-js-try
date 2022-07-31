import React from 'react';
import { Canvas } from '@react-three/fiber';

import { CustomCanvasProps } from './CustomCanvas.types';

export const CustomCanvas = ({ camera, style, backgroundColor, ...props }: CustomCanvasProps) => {
    return (
        <Canvas
            camera={camera ?? { position: [0, 0, 0], fov: 15 }}
            style={
                style ?? {
                    backgroundColor: backgroundColor ?? '#111a21',
                    width: '100vw',
                    height: '100vh',
                }
            }
            {...props}
        />
    );
};
