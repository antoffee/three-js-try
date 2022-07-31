import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import cnBind, { Argument } from 'classnames/bind';
import { CatsPage } from 'pages/CatsPage';
import { ContentListPage } from 'pages/ContentListPage';
import { HeartPage } from 'pages/HeartPage';

import styles from './App.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const App: React.FC = () => {
    return (
        <div className={cx('App')}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ContentListPage />} />
                    <Route path="/heart" element={<HeartPage />} />
                    <Route path="/cats" element={<CatsPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
