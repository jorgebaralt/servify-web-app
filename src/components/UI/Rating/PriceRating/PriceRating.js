import React from 'react';
// CSS
import classes from './PriceRating.module.css';
// JSX
import Currency from './Currency/Currency';

const currenciesRating = (props) => {
    // Declaring initial variables, the amount of currencies rendered by default is 4
    const amountOfCurrencies = 4;
    // Boolean that allows the loop to keep spreading the rating or not depending if it's necessary
    let bRatingReached = false;
    let currencies = [];
    /**
     * For loop currencyting from 1 (first currency) to the amount of currencies, default amount is 4,
     * the total amount of loops is always equal to the amount of currencies.
     */
    for (let i = 1; i <= amountOfCurrencies; i++) {
        /**
         * If statement that determines if the rating needs to be spread still
         * between the remaining currencies to be looped, if not needed, they will
         * return with a rating of 0%.
         */
        if (!bRatingReached) {
            /**
             * The following if statement checks if the rating is less or equal than the current currency 
             * divided by the total amount of currencies, if true, it means it's the last currency that will 
             * be filled with color, it's relative to the total rating. If it's false it will push 
             * a currency with a fill of 100%.
             */
            if (props.rating <= i/amountOfCurrencies) {
                /**
                 * We have reached the last currency that needs to be filled with color, therefore
                 * the boolean is set to true to avoid further currencies from being filled, instead
                 * they will be rendered as currencies with 0% fill, if there are any left.
                 */
                bRatingReached = true;
                /**
                 * The price rating fills completely, so whatever the rating from the props is, the svg
                 * will be filled fully. Every subsequent svg, if any, will be empty.
                 */
                const rating = '100%';
                currencies.push(
                    <Currency 
                        {...props}
                        onClick={() => props.onClick((i-1)/amountOfCurrencies)}
                        key={i} 
                        fill={rating}/>
                );
                /**
                 * Continue to break the current loop and return the rest of the currencies with 0% of fill, if any.
                 */
                continue;
            }
            // currencies with 100% of fill if we have not reached the last currency.
            currencies.push(
                <Currency 
                    {...props} 
                    onClick={() => props.onClick((i-1)/amountOfCurrencies)} 
                    key={i} />
            );
            // Continue to break the current loop and avoid returning extra currencies.
            continue;
        }
        // currencies with 0% of fill.
        currencies.push(
            <Currency 
                {...props} 
                onClick={() => props.onClick((i-1)/amountOfCurrencies)} 
                key={i} 
                fill={'0%'} />
        );
    }
    return (
        <span className={[classes.Price, props.priceContainerClassname].join(' ')}>
            {currencies}
        </span>
    );
}

export default currenciesRating;