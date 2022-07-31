import React from 'react';
import { Link } from 'react-router-dom';
import cnBind, { Argument } from 'classnames/bind';

import styles from './ContentListPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ContentListPage = () => {
    return (
        <div className={cx('content-list-page')}>
            <h1>Contents of app</h1>
            <ul className={cx('content-list-page__list')}>
                <li className={cx('content-list-page__list-item')}>
                    <Link to="/heart">Animated colored heart example</Link>
                </li>
                <li className={cx('content-list-page__list-item')}>
                    <Link to="/cats">Animated cats models</Link>
                </li>
            </ul>
        </div>
    );
};
