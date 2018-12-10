import React from 'react';
// CSS
import classes from './PriceRating.module.css';
// JSX
import Currency from './Currency/Currency';

const starsRating = (props) => {
    // Declaring initial variables, the amount of stars rendered by default is 4
    const amountOfCurrencies = 4;
    // Boolean that allows the loop to keep spreading the rating or not depending if it's necessary
    let bRatingReached = false;
    let currencies = [];
    /**
     * For loop starting from 1 (first star) to the amount of stars, default amount is 4,
     * the total amount of loops is always equal to the amount of stars.
     */
    for (let i = 1; i <= amountOfCurrencies; i++) {
        /**
         * If statement that determines if the rating needs to be spread still
         * between the remaining stars to be looped, if not needed, they will
         * return with a rating of 0%.
         */
        if (!bRatingReached) {
            /**
             * The following if statement checks if the rating is less than the current star 
             * divided by the total amount of stars, if true, it means it's the last star that will 
             * be filled with color, it's relative to the total rating. If it's false it will push 
             * a star with a fill of 100%.
             */
            if (props.rating < i/amountOfCurrencies) {
                /**
                 * We have reached the last star that needs to be filled with color, therefore
                 * the boolean is set to true to avoid further stars from being filled, instead
                 * they will be rendered as stars with 0% fill, if there are any left.
                 */
                bRatingReached = true;
                /**
                 * The price rating fills completely, so whatever the rating from the props is, the svg
                 * will be filled fully. Every subsequent svg, if any, will be empty.
                 */
                const rating = '100%';
                currencies.push(<Currency key={i} fill={rating}/>);
                /**
                 * Continue to break the current loop and return the rest of the stars with 0% of fill, if any.
                 */
                continue;
            }
            // Stars with 100% of fill if we have not reached the last star.
            currencies.push(<Currency key={i} />);
            // Continue to break the current loop and avoid returning extra stars.
            continue;
        }
        // Stars with 0% of fill.
        currencies.push(<Currency key={i} fill={'0%'} />);
    }
    return (
        <span className={classes.Price}>
            {currencies}
        </span>
    );
}

export default starsRating;