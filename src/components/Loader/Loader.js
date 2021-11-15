import React from 'react';
import css from './Loader.module.css';

const Loader = () => {
    return (
        <div className={css.loaderContainer}>
            <p className={css.cardLoading}></p>
        </div>
    );
};

export default Loader;