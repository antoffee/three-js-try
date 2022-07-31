import React, { useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import cnBind, { Argument } from 'classnames/bind';

import { AnimatedHeart } from 'components/AnimatedHeart';
import { CustomCanvas } from 'components/CustomCanvas';

import styles from './HeartPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const HeartPage = () => {
    const [color, setColor] = useState('#008080');
    return (
        <div className={cx('heart-page')}>
            <div className={cx('heart-page__color')}>
                <p>
                    Current color: <b style={{ color }}>{color}</b>
                </p>
                <p>Select color</p>
                <input
                    onChange={(e) => setColor(e.target.value)}
                    type="color"
                    value={color}
                    title="enter color"
                    placeholder="enter color"
                />
            </div>
            <CustomCanvas camera={{ position: [0, 0, 90], fov: 25 }}>
                <ambientLight intensity={1.25} />
                <ambientLight intensity={0.1} />
                <directionalLight intensity={0.4} />
                <AnimatedHeart bgColor={color} />
                <OrbitControls />
            </CustomCanvas>
        </div>
    );
};
