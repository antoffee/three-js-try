import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import cnBind, { Argument } from 'classnames/bind';
import { ContentListPage } from 'pages/ContentListPage';

// import { AnimatedHeart } from 'components/AnimatedHeart';
import styles from './App.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const App: React.FC = () => {
    return (
        <div className={cx('App')}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ContentListPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
