import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import cnBind, { Argument } from 'classnames/bind';

import { AnimatedHeart } from 'components/AnimatedHeart';

import styles from './App.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const App: React.FC = () => {
    return (
        <div className={cx('App')}>
            <Canvas
                camera={{ position: [0, 0, 50], fov: 15 }}
                style={{
                    backgroundColor: '#111a21',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <ambientLight intensity={1.25} />
                <ambientLight intensity={0.1} />
                <directionalLight intensity={0.4} />
                <AnimatedHeart />
                <OrbitControls />
            </Canvas>
        </div>
    );
};
