import React, { Suspense } from 'react';
import GrayCatModel from 'models/GrayCatModel';

export const GrayCat = () => {
    return (
        <Suspense fallback={null}>
            <GrayCatModel />
        </Suspense>
    );
};
