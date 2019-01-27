import React from 'react';
// CSS
import classes from './Information.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const renderCurrencies = (amount) => {
    const array = [];
    for (let i = 0; i < 4; i++) {
        if (amount <= i) {
            array.push(<SVG key={i} svg='currency' fill='0%' />);
        } else {
            array.push(<SVG key={i} svg='currency' fill='100%' />);
        }
    }
    return array;
}

const render = (amount, text) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Currencies}>
                {renderCurrencies(amount)}
            </div>
            <div>
                <strong>{amount}</strong> {text}
            </div>
        </div>
    );
}

const information = () => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <div className={classes.Header}>
                    What you're seeing here is our <strong>price rating system</strong>. The way it works is as follows:
                </div>
            </div>
            {render(1, 'currency highlighted means that the price is low when compared to similar services.')}
            {render(2, 'currencies highlighted means that the price is similar when compared to similar services.')}
            {render(3, 'currencies highlighted means that the price is higher than similar services.')}
            {render(4, 'currencies highlighted means that the price is much higher than similar services.')}
        </div>
    );
}

export default information;